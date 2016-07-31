#!/usr/bin/env node

var cli = require('cli');
var packageJson = require(__dirname + '/../package.json');
var wpu = require('../includes/wpu.js');
var msgs = require('../includes/messages.json');

/*
 * Set the app name and version, otherwise it defaults to the ones from the `cli` package
 */
cli.setApp('wpu', packageJson.version);

/*
 * Enable plugins
 */
cli.enable('version', 'status');

/*
 * Describe the required options
 */
cli.parse({
	path: ['p', msgs.args.path, 'path']
});

cli.main(function() {

	var config = {
		name: packageJson.name,
		version: packageJson.version,
		repo: 'WordPress/WordPress',
		path: wpu.formatPath(this.options.path)
	};

	wpu.update(config);

});
