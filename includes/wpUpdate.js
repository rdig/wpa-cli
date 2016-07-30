
var fs = require('fs');

module.exports = {
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
