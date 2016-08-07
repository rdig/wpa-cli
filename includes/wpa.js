var fs = require('fs');
var request = require('request');
var tar = require('tar-fs')
var gunzip = require('gunzip-maybe');
var msgs = require('./messages.json');
var notify = {
	log: require('cli').ok,
	error: require('cli').error,
	exit: require('cli').fatal,
	debug: require('cli').debug
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

			fs.accessSync(versionFile, fs.F_OK);
			return fs.readFileSync(versionFile, 'utf8').substr(94, 5);

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
	 * @method _getLatestTarball
	 *
	 * @param {object} requestOptions Options to be passed to the ajax request (url/headers).
	 * User-Agent headers are required since Github won't allow us to make an API call without them.
	 * @param {string} version Latest version available in the repo (used for notification
	 * purposes)
	 *
	 * @return {object} The request object
	 */
	_getLatestTarball: function(requestOptions, version) {

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
	 * @param {object} configObject Configuration object passed in when calling the function (most
	 * values are taken from `package.json`)
	 * @param {string} version The version (tag name) of wordpress to download
	 *
	 * @return {boolean} This method does not return anything, it will only perform operations on
	 * the file system
	 */
	_download: function(configObject, version) {

		configObject = configObject || {};
		version = version || '0.0.0';

		var config = Object.assign({
			appName: 'app-name',
			appVersion: '0.0.0',
			repo: '#',
			path: './'
		}, configObject);

		var options = {
			url: 'https://api.github.com/repos/' + config.repo + '/tarball/' + version,
			headers: {
				'User-Agent': config.appName + '/' + config.appVersion
			}
		};

		this._getLatestTarball(options, version)
			.pipe(gunzip())
			.pipe(this._extractTarball(configObject.path));

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

	update: function(configObject) {

		configObject = configObject || {};

		var config = Object.assign({
			appName: 'app-name',
			appVersion: '0.0.0',
			repo: '#',
			path: './'
		}, configObject);

		var options = {
			url: 'https://api.github.com/repos/' + config.repo + '/tags',
			headers: {
				'User-Agent': config.appName + '/' + config.appVersion
			}
		};

		var wpa = this;
		var currentVersion = wpa._checkLocalVersion(config.path);

		notify.log(msgs.updateRequired + ' (current version ' +	currentVersion + ')');

		request(options, function (error, response, body) {

			if (!error && response.statusCode === 200) {

				var latestVersion = JSON.parse(body)[0].name;
				if (latestVersion !== currentVersion) {

					wpa._download(config, latestVersion);

				} else {

					notify.log(msgs.latestVersion + ' (version ' + latestVersion + ')');

				}

			} else {
				notify.error(msgs.apiError);
			}

		});

	}

};
