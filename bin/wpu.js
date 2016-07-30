#!/usr/bin/env node

var cli = require('cli');
var packageJson = require(__dirname + '/../package.json');
var wpUpdate = require('../includes/wpUpdate.js');

cli.setApp('wpu', packageJson.version);

cli.enable('version', 'status');

cli.parse({
	path: ['p', 'Path were Wordpress install resides', 'file', '/']
});

cli.main(function() {

	var wpPath = wpUpdate.formatPath(this.options.path);

});
