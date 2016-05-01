/*
 * Main module file for merchant-demo.web-payments.io.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var brExpress = require('bedrock-express');
require('bedrock-protractor');
require('bedrock-requirejs');
var brServer = require('bedrock-server');
require('bedrock-views');
require('./config');
require('./services.payments');

var api = {};
module.exports = api;

// FIXME: Since this is a demo, pretty print any JSON output
brExpress.app.set('json spaces', 2);

// FIXME: Do HTTP-only for now to avoid having to buy and setup HTTPS certs
// TODO: Eventually use Let's Encrypt
// track when bedrock is ready to attach express
bedrock.events.on('bedrock.ready', function() {
  // attach express to regular http
  brServer.servers.http.on('request', brExpress.app);
});
