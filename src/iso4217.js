"use strict";

;(function(global, factory) {
 	if(typeof exports === 'object' && typeof module !== 'undefined') {
		 module.exports = factory;
	} 
	else if(typeof define === 'function' && define.amd) {
		define(factory);
	}
	else {
		global.iso4217 = factory;
	}
})
(this, Object.freeze({
		"USD" : Object.freeze({
			symbol : "$",
			precision : 2,
			code : "USD"
		}),
		"EUR" : Object.freeze({
			symbol : "€",
			precision : 2,
			code : "EUR"
		})
	})
);

	//todo: add full list of ISO 4217 currencies
	//todo: look into auto generating this file
	//todo: look for an authoritiative source on currency symbols
