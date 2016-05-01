/*
 * merchant-demo.merchant-demo.web-payments.io default configuration.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// location of logs
var _logdir = '/tmp/merchant-demo.web-payments.io';

// core
// 0 means use # of cpus
config.core.workers = 1;
config.core.master.title = 'merchantd';
config.core.worker.title = 'merchantd-worker';
config.core.worker.restart = false;

// logging
config.loggers.app.filename =
  path.join(_logdir, 'merchant-demo.web-payments.dev-app.log');
config.loggers.access.filename =
  path.join(_logdir, 'merchant-demo.web-payments.dev-access.log');
config.loggers.error.filename =
  path.join(_logdir, 'merchant-demo.web-payments.dev-error.log');
config.loggers.email.silent = true;
config.loggers.email.to = ['cluster@merchant-demo.web-payments.io'];
config.loggers.email.from = 'cluster@merchant-demo.web-payments.io';

// server info
config.server.port = 55443;
config.server.httpPort = 55080;
config.server.bindAddr = ['merchant-demo.web-payments.dev'];
config.server.domain = 'merchant-demo.web-payments.dev';
config.server.host = 'merchant-demo.web-payments.dev:55080';
config.server.baseUri = 'http://' + config.server.host;

// express info
config.express.session.secret = 'NOTASECRET';
config.express.session.key = 'merchant-demo.web-payments.io.sid';
config.express.session.prefix = 'merchant-demo.web-payments.io.';

config.requirejs.bower.packages.push({
  path: path.join(__dirname, '..', 'components'),
  manifest: {
    name: 'merchant-demo',
    moduleType: 'amd',
    main: './main.js',
    dependencies: {
      angular: '~1.3.0'
    }
  }
});

// views
// branding
config.views.brand.name = 'HTTP Payment Mediator Demo';

// update view vars
config.views.vars.baseUri = config.server.baseUri;
config.views.vars.title = config.views.brand.name;
config.views.vars.siteTitle = config.views.brand.name;
config.views.vars.supportDomain = config.server.domain;
config.views.vars.debug = false;
config.views.vars.footer.show = false;
// FIXME: add logo img
config.views.vars.style.brand.alt = config.views.brand.name;
config.views.vars.style.brand.src = null;//'/img/brand.png';
//config.website.views.vars.style.brand.height = '24';
//config.website.views.vars.style.brand.width = '25';
// contact info
config.views.vars.contact.address = {
  label: 'Digital Bazaar, Inc.',
  address:
    '123 FIXME\n' +
    'FIXME, XX 12345\n' +
    'United States of America',
  htmlAddress:
    '123 FIXME<br/>' +
    'FIXME, XX 12345<br/>' +
    'United States of America'
};
config.views.vars.demoWarningUrl = null;

// merchant-demo.web-payments.io config
config.views.vars['merchant-demo.web-payments.io'] = {};
