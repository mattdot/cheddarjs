"use strict";

;(function(global, factory) {
	if(typeof exports === 'object' && typeof module !== 'undefined') {
		 module.exports = factory;
	} 
	else if(typeof define === 'function' && define.amd) {
		define(factory);
	}
	else {
		global.cheddar = global.c$ = factory;
	}
})(this, 

/**
 * Creates a cheddar currency object
 * @param {number} value This is the amount represented by this object
 * @param {string} currency The 3 letter currency code specified by ISO4217
 * @return {object} This returns a cheddar currency object
 */
function(value, currency) {
	var ISO_4217 = require("./iso4217"); 

	/*
	 * @constructor
	 */
	var Cheddar = function(value, currency) {
		if(!isNaN(parseFloat(value)) && isFinite(value)) {
			this.value = value;
		} else {
			throw Error('`value` must be numeric');
		}

		if(ISO_4217.hasOwnProperty(currency)) {
			this.currency = ISO_4217[currency];
		} else {
			throw Error('`currency` must be defined by ISO 4217');
		}

		Object.freeze(this);
	};
	
	/*
	 * Formats the currency according to the locale's rules
	 * @param {string} locale A string representing the locale (i.e. 'en-US')
	 * @param {object} options An object representing options to use formatting the currency
	 */
	Cheddar.prototype.toLocaleString = function() {
		var locale = (arguments.length && typeof arguments[0] === 'string' ? arguments[0] : null);
		var formatOptions = (arguments.length && typeof arguments[arguments.length-1] === 'object' ? arguments[arguments.length-1] : {});

		//todo:consider taking a dependency on 'intl' for number formatting	

		return this.currency.symbol + ((this.value % 1 !== 0)? this.value.toFixed(this.currency.precision) : this.value.toFixed(0));		
	};

	/*
  	 * Formats the currency according to the 'current' locale
	 */
	Cheddar.prototype.toString = function() {
		var defaultLocale = "en-US"; //todo: figure out the right place to get the default

		return this.toLocaleString(defaultLocale, {});
	};

	Cheddar.prototype.valueOf = function() {
		console.log('valueOf called');
		return this.value;
	};

	/*
  	 * Adds two currencies together
	 */
	Cheddar.prototype.add = function(amount) {
		var v = 0;
		if(typeof amount === 'object') {
			if(this.currency.code !== amount.currency.code) {
				throw Error("Can't add different currencies");
			}
			v = amount.value;
		} else if(typeof amount === 'number') {
			v = amount;
		}

		return new Cheddar(this.value + v, this.currency.code);
	};

	return new Cheddar(value, currency);
});
