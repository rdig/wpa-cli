var chai = require('chai');
var wpu = require('../includes/wpu.js');

describe('main' + '\n', function() {

	describe('_checkLocalVersion', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpu._checkLocalVersion === 'function');

		});

	});

	describe('_getLatestTarball', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpu._getLatestTarball === 'function');

		});

	});

	describe('_extractTarball', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpu._extractTarball === 'function');

		});

	});

	describe('formatPath', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpu.formatPath === 'function');

		});

	});

	describe('update', function() {

		it('Method should exist', function() {

			chai.assert.equal(true, typeof wpu.update === 'function');

		});

	});

});
