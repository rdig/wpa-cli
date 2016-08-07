var fs = require('fs');
var request = require('request');
var tar = require('tar-fs')
var gunzip = require('gunzip-maybe');
var packageJson = require('../package.json');
var msgs = require('./messages.json');
var notify = {
	log: require('cli').ok,
	error: require('cli').error,
	exit: require('cli').fatal,
	debug: require('cli').debug
};
var defaultConfig = {
	app: {
		name: packageJson.name,
		version: packageJson.version
	},
	wp: {
		repo: 'WordPress/WordPress',
		path: './',
		version: '1.5.0'
	}
};

module.exports = {

	/**
	 * @todo Find a reliable way to parse the `versions.php` file
	 *
	 * Check the version of the locally installed wordpress
	 * The _ (underscore) before the name denotes that this function in meant to be for internal
	 * use only and not called directly from the cli initializer (wpa_cli)
	 *
	 * @method checkLocalVersion
	 *
	 * @param {string} wordpressPath Path to location of the wordpress installation, relative to the
	 * base folder. Defaults to './'.
	 *
	 * @return {string} The locally installed Wordpress's version
	 */
	_checkLocalVersion: function(wordpressPath) {

		wordpressPath = wordpressPath || './';
		var versionFile = wordpressPath + 'wp-includes/version.php';

		try {

			var dirtyVersion = fs.readFileSync(versionFile, 'utf8').substr(94, 9);
			return dirtyVersion.slice(0, dirtyVersion.indexOf('\''));

		} catch (error) {

			notify.debug(error);
			notify.exit(msgs.versionNotFound);
			return false;

		}

	},

	/**
	 * Fetch the latest .tar.gz archive from the Github repository. This function will be used
	 * as a stream, so it will be .pipe() -ed
	 * The _ (underscore) before the name denotes that this function in meant to be for internal
	 * use only and not called directly from the cli initializer (wpa_cli)
	 *
	 * @method _getTarball
	 *
	 * @param {object} requestOptions Options to be passed to the ajax request (url/headers).
	 * User-Agent headers are required since Github won't allow us to make an API call without them.
	 * The version (tag name) of wordpress to download is embedded into the url.
	 * @param {string} version Latest version available in the repo (used for notification
	 * purposes). Do not cofuse this with the version to download, that is passed in via
	 * `requestOptions.url`
	 *
	 * @return {object} The request object
	 */
	_getTarball: function(requestOptions, version) {

		requestOptions = requestOptions || {
			url: 'https://api.github.com/repos/#/tags',
			headers: {
				'User-Agent': 'app-name/0.0.0'
			}
		};
		version = version || '0.0.0';

		notify.log(msgs.gettingLatest + ' (' + version + ')');

		return request.get(requestOptions, function(error, response) {

			if (error || response.statusCode !== 200) {
				notify.error(msgs.apiError);
			}

		});
	},

	/**
	 * Extract all files / folders from a .tar.gz archive. This function will be used as a stream,
	 * so it will be .pipe() -ed
	 * The _ (underscore) before the name denotes that this function in meant to be for internal
	 * use only and not called directly from the cli initializer (wpa_cli)
	 *
	 * @method _extractTarball
	 *
	 * @param {string} extractionPath The path were the archive is to be extracted
	 *
	 * @return {function} The extractor function
	 */
	_extractTarball: function(extractionPath) {

		extractionPath = extractionPath || './';

		notify.log(msgs.extractingTo + ' ' + extractionPath);

		return tar.extract(extractionPath, {
			/*
			 * We are re-writing the root folder of the archive to nothing (''), since we don't
			 * need it.
			 */
			map: function(header) {
				var originalDirName = header.name.split('/')[0];
				header.name = header.name.replace(originalDirName, '');
				return header;
			}
		});
	},

	/**
	 * Orchestrator method that handles the download procedure with calls to various helper
	 * functions
	 * The _ (underscore) before the name denotes that this function in meant to be for internal
	 * use only and not called directly from the cli initializer (wpa_cli)
	 *
	 * @method _download
	 *
	 * @param {object} configObject Configuration object passed in when calling the function.
	 * It is derived from the `defaultConfig` object + arguments pass in to the cli.
	 * @param {string} successMessage Message that gets outputed when the download / extract
	 * stream succeeds.
	 *
	 * @return {null} This method does not return anything, it will only perform operations on
	 * the file system
	 */
	_download: function(configObject, successMessage) {

		configObject = configObject || {};
		successMessage = successMessage || 'Done downloading';

		var config = Object.assign(defaultConfig, configObject);

		var requestSettings = {
			url: 'https://api.github.com/repos/' + config.wp.repo + '/tarball/' + config.wp.version,
			headers: {
				'User-Agent': config.app.name + '/' + config.app.version
			}
		};

		this._getTarball(requestSettings, config.wp.version)
			.on('end', function() {
				notify.log(successMessage);
			})
			.pipe(gunzip())
			.pipe(this._extractTarball(config.wp.path));

	},

	/**
	 * Add a trailing slash to the supplied path. If there is already one passed in, do nothing.
	 *
	 * @method formatPath
	 *
	 * @param {string} path The path to the wordpress installation (or any other path). Defaults
	 * to '/'.
	 *
	 * @return {string} The path with the trailing slash added / the original path
	 */
	formatPath: function(path) {
		path = path || '/';
		if (path.indexOf('/') !== path.length-1) {
			return path + '/';
		}
		return path;
	},

	/**
	 * Update the local version of wordpress. It will compare the local-found version with the
	 * latest one found in the repository (tag name) and call the _download() method based on that.
	 *
	 * @method update
	 *
	 * @param  {string} path Path passed in via the `--path` call argument. Represents the local
	 * wordpress install path.
	 *
	 * @return {null} This method does not return anything, as it is only a caller
	 */
	update: function(path) {

		path = path || './';

		var config = Object.assign({},defaultConfig);
		config.wp.path = path;

		var requestSettings = {
			url: 'https://api.github.com/repos/' + config.wp.repo + '/tags',
			headers: {
				'User-Agent': config.app.name + '/' + config.app.version
			}
		};

		var wpa = this;
		var currentVersion = wpa._checkLocalVersion(config.wp.path);

		notify.log(msgs.updateRequired + ' (current version ' +	currentVersion + ')');

		request(requestSettings, function (error, response, body) {

			if (!error && response.statusCode === 200) {

				var latestVersion = JSON.parse(body)[0].name;

				if (latestVersion !== currentVersion) {

					config.wp.version = latestVersion;
					wpa._download(config, msgs.updateComplete);

				} else {

					notify.log(msgs.latestVersion + ' (version ' + latestVersion + ')');

				}

			} else {
				notify.error(msgs.apiError);
			}

		});

	}

};
