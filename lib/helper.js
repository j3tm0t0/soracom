'use strict';

var util = require('util');

exports.replacePath = function(path, params) {
  var regexp = /\/:(\w+)/g
  return path.replace(regexp, function(match) {
    // Trim given string like "/:operator_id" => "operator_id"
    var paramName = match.slice(2);
    var replacement = params[paramName];
    if (!replacement) {
      throw new Error(util.format('params object is missing a required parameter for this request: "%s"', paramName));
    }
    delete params[paramName];
    return '/' + replacement;
  });
}

/**
 * Extend object. Code extracted from https://github.com/nodejs/node/blob/master/lib/util.js
 */
exports.extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (add === null || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};