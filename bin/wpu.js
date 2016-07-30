#!/usr/bin/env node

var cli = require('cli');
var packageJson = require('../package.json');

cli.setApp('wpu', packageJson.version);

cli.enable('version', 'status');

cli.parse({
	path: ['p', 'Path were Wordpress install resides', 'file', './']
});

cli.main(function() {
	this.spinner('Starting update...');
	setTimeout(function() {
		cli.spinner('Update done.', true);
	}, 5000);
});
