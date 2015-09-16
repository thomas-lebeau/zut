'use strict';
var assign = require('object-assign');
var msgs = require('./messages.js');
var hasOwnDeep = require('has-own-deep');
var getValue = require('get-value');
var say = require('say');

module.exports = function (opts) {
	var defaults = {
		voice: null,
		messages: msgs,
		filters: false
	};
	var options = assign({}, defaults, opts);
	var messages = [];

	if (typeof options.messages === 'string') {
		messages.push(options.messages);
	} else if (Array.isArray(options.messages) || (options.messages instanceof Object)) {
		messages = [options.messages];
	} else {
		throw new TypeError('Expected a string an Array or an Object');
	}

	// filter and populate messages[]
	if (options.filters) {
		var filters = options.filters;
		if (typeof filters === 'string' && options.messages.hasOwnProperty(filters)) {
			messages = options.messages[filters];
		} else {
			messages = [];
			for (var i in filters) {
				if ({}.hasOwnProperty.call(filters, i) && hasOwnDeep(options.messages, filters[i])) {
					messages.push(getValue(options.messages, filters[i]));
				}
			}
			console.log(messages);
		}
	}

	// flatten an oject to a single level Array.
	function flatten(obj) {
		var flattened = [];
		var maxDepth = 4;

		function flatOneLevel(obj, maxDepth, flattened) {
			for (var i in obj) {
				if ({}.hasOwnProperty.call(obj, i)) {
					var item = obj[i];
					if (typeof item === 'string') {
						flattened.push(item);
					} else if (maxDepth > 1) {
						flatOneLevel(item, maxDepth - 1, flattened);
					}
				}
			}
		}
		flatOneLevel(obj, maxDepth, flattened);
		return flattened;
	}

	function getRandomMessage(msgs) {
		msgs = flatten(msgs);
		if (!msgs || msgs.length === 0) {
			return '';
		}
		return msgs[Math.round(Math.random() * (msgs.length - 1))];
	}
	var msg = getRandomMessage(messages);
	try {
		say.speak(options.voice, msg);
		return msg;
	} catch (err) {
		throw err;
	}
};
