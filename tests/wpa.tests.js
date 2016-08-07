var chai = require('chai');
var wpa = require('../includes/wpa.js');

describe('main' + '\n', function() {

	describe('_checkLocalVersion', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa._checkLocalVersion === 'function');

		});

	});

	describe('_getLatestVersion', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa._getLatestVersion === 'function');

		});

	});

	describe('_getTarball', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa._getTarball === 'function');

		});

	});

	describe('_extractTarball', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa._extractTarball === 'function');

		});

	});

	describe('_download', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa._download === 'function');

		});

	});

	describe('formatPath', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa.formatPath === 'function');

		});

	});

	describe('update', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa.update === 'function');

		});

	});

	describe('install', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpa.install === 'function');

		});

	});

});
