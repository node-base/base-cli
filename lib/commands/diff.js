'use strict';

module.exports = function(app) {
  return function(val) {
    if (typeof app.option === 'function') {
      app.option('diff', val);
    } else {
      app.options.diff = val;
    }
  };
};