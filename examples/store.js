'use strict';

var expand = require('expand-args');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {set: 's', get: 'g', del: 'd'}
});
var base = require('base');
var store = require('base-store');
var cli = require('..');
var app = base()
  .use(store('base-cli-test'))
  .use(cli())

app.on('store.set', function (key, val) {
  console.log('[store] set', key, '=>', val);
});
app.store.on('set', function (key, val) {
  console.log('[store] set', key, '=>', val);
});
app.store.on('get', function (key, val) {
  console.log('[store] got', key, '=>', val);
});
app.store.on('del', function (key) {
  console.log('[store] deleted =>', key);
});

// Try:
//
//  'node examples/store.js --store.set=a:b --store.get=a --store.del=a'
//
app.cli.process(expand(argv), function(err) {
  if (err) throw err;
});
