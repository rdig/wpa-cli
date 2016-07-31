/*
 * Please make note that this is not the default `fs` package from `node.js`.
 * This is an external package which adds more functionality than the vanilla one, but also keeps
 * theoriginal methods.
 */
var fs = require('fs-extra');
var request = require('request');
var tar = require('tar-fs')
var gunzip = require('gunzip-maybe');

module.exports = {

	/**
	 * @todo Find a reliable way to parse the `versions.php` file
	 *
	 * Check the version of the locally installed wordpress
	 *
	 * @method checkLocalVersion
	 *
	 * @param {string} wordpressPath Path to location of the wordpress installation, relative to the
	 * base folder. Defaults to './'.
	 * @param {function} exit Notification function to call in case of fatal error
	 * @param {function} debug Notification function to call in case the script was
	 * invoked using `-- debug`
	 *
	 * @return {string} The locally installed Wordpress's version
	 */
	_checkLocalVersion: function(wordpressPath, exit, debug) {

		wordpressPath = wordpressPath || './';
		exit = exit || function(msg) {
			console.error(msg);
			process.exit();
		};
		debug = debug || function() {};
		var exitMessage = 'Cannot find version.php file. Ensure that you supplied a correct ' +
			'wordpress installation path. Call with --help for more information.';
		var versionFile = wordpressPath + 'wp-includes/version.php';

		try {

			fs.accessSync(versionFile, fs.F_OK);
			return fs.readFileSync(versionFile, 'utf8').substr(94, 5);

		} catch (error) {

			debug(error);
			exit(exitMessage);
			return false;

		}

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
	}

};
