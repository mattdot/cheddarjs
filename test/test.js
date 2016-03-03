var assert = require('assert');
var c$ = require('../src/cheddar.js');

describe('Cheddar', function() {
	describe('#toString',function() {
		it('should return "$5" when value is 5 and currency is USD', function() {
			assert.equal('$5', c$(5,'USD').toString());
			assert.equal('$5', c$(5.00, 'USD').toString());
		});
		it('should return "$5.50" when value is 5.50 or 5.5 and currency is USD', function() {
			assert.equal('$5.50', c$(5.5, 'USD').toString());
			assert.equal('$5.50', c$(5.50, 'USD').toString());
		});
		it('should return "$5.50" when value is 5.500 and currency is USD', function() {
			assert.equal('$5.50', c$(5.500, 'USD').toString());
		});
	});
	describe('#add', function() {
		it('should equal 9 when $5 is added to $4', function() {
			assert.equal(9, c$(5.00, 'USD').add(c$(4, 'USD')).value);
		});
		it('should equal 5.50 when $2.75 is added to $2.75', function() {
			var v = c$(2.75, 'USD').add(2.75);
			assert.equal(5.50, v.value);
			assert.equal('USD', v.currency.code);
		});
		it('should error when adding USD to EUR', function() {
			assert.throws(function() {
				c$(5.00, 'USD').add(c$(5.00, 'EUR'));
			}, Error, "Can't add different currencies");
		});
	});
});
