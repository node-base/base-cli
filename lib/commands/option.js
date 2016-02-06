'use strict';

var utils = require('../utils');

/**
 * Set options on the `app.options` object. This is the API-equivalent of
 * calling `app.option()`. You may also use the plural `--options` flag
 * for identical behavior.
 *
 * ```sh
 * $ --option=foo
 * # sets {foo: true}
 * $ --option=foo:bar
 * # sets {foo: 'bar'}
 * $ --option=foo.bar:baz
 * # sets {foo:{bar: 'baz'}}
 * ```
 * @name option
 * @api public
 * @cli public
 */

module.exports = function(app) {
  return function(val, next) {
    if (typeof app.option === 'function') {
      app.option(val);

    } else if (utils.typeOf(val) === 'object') {
      app.options = utils.extend({}, app.options, val);
      for (var key in val) {
        if (val.hasOwnProperty(key)) {
          app.emit('option', key, val[key]);
        }
      }
    }
    next();
  };
};