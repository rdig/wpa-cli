
var fs = require('fs');

module.exports = {
	/**
	 * Add a trailing slash to the supplied path. If there is already one passed in, do nothing.
	 *
	 * @method formatPath
	 *
	 * @param {string} path The path to the wordpress installation (or any other path)
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
	 * @todo Find a reliable way to parse the versions file
	 *
	 * Check the version of the locally installed wordpress
	 *
	 * @method checkLocalVersion
	 *
	 * @param {string} wordpressPath Path to location of the wordpress installation, relative to the
	 * base folder
	 *
	 * @return {string} The locally installed Wordpress's version
	 */
	checkLocalVersion: function(wordpressPath) {
		wordpressPath = wordpressPath || '/';
		var versionFile = wordpressPath + 'wp-includes/version.php';
		return fs.readFileSync(versionFile, 'utf8').substr(94, 5);
	},
	checkLatestVersion: function() {}
};
