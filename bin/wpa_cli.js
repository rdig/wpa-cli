#!/usr/bin/env node

var cli = require('cli');
var packageJson = require(__dirname + '/../package.json');
var wpa = require('../includes/wpa.js');
var msgs = require('../includes/messages.json');

var options = {
	path: ['p', msgs.args.path, 'path']
};
var commands = [
	'install',
	'update'
];

/*
 * Set the app name and version, otherwise it defaults to the ones from the `cli` package
 */
cli.setApp('wpa-cli', packageJson.version);

/*
 * Enable plugins
 */
cli.enable('version', 'status');

/*
 * Describe the required options
 */
cli.parse(options, commands);

cli.main(function() {

	if (!this.options.path) {
		cli.fatal(msgs.argsError.noPath);
		return;
	}

	var path = wpa.formatPath(this.options.path);

	switch (this.command) {

	case 'install':
		break;

	case 'update':
		wpa.update(path);
		break;

	default:
		break;

	}

});
