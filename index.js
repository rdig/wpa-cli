/*
 * Since we don't have a programatic API just yet, the only thing the package does if it's
 * imported, is warn the user about this.
 */

module.exports = function() {
	console.log('`wpa-cli` does not yet have an programatic interface, it\'s just ' +
	'used via the CLI. If you want to help build it, we would gladly welcome a PR. Take a look ' +
	'at https://github.com/rdig/wpa-cli/contributing.md for more info.');
};
