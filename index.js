var packageJson = require('package.json');
var msgs = require('includes/messages.json');

/*
 * Since we don't have a programatic API just yet, the only thing the package does if it's
 * imported, is to warn the user about this.
 */
module.exports = function() {
	console.log('`' + packageJson.name + '` ' + msgs.noApi);
};
