var chai = require('chai');
var executable = require('executable');
var fs = require('fs');
var cliFile = 'bin/wpa_cli.js';

describe('cli' + '\n', function() {

	describe('bin', function() {

		it('The file `' + cliFile + '` should exist', function() {

			try {

				fs.accessSync(cliFile, fs.F_OK);
				chai.expect(true).to.equal(true);

			} catch(error) {

				done(error);

			}

		});

		it('File should be executable', function() {

			chai.assert.equal(true, executable.sync(cliFile));

		});

	});

});
