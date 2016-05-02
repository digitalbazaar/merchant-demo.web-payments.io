/*
 * Main module file for merchant-demo.web-payments.io.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var config = bedrock.config;
var cors = require('cors');
var crypto = require('crypto');

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  // payment protected resource endpoint
  app.options('/movies/dr-strangelove', cors());
  app.get('/movies/dr-strangelove', cors(),
    function(req, res, next) {
      res.status(402);
      res.setHeader(
        'Location', config.server.baseUri + '/movies/dr-strangelove/requests');
      res.end();
      return;
  });

  // payment request endpoint
  app.options('/movies/dr-strangelove/requests', cors());
  app.get('/movies/dr-strangelove/requests', cors(),
    function(req, res, next) {

      // create the payment request
      var transactionId = crypto.randomBytes(8).toString('hex');
      var paymentCompleteService = config.server.baseUri +
          '/movies/dr-strangelove/payments?transaction=' + transactionId;
      var paymentMethods = ['VisaLegacy', 'AmericanExpressLegacy',
            'MasterCardLegacy', 'DiscoverLegacy'];
      var paymentRequest = {
        type: 'PaymentRequest',
        description: 'Payment for Dr. Strangelove',
        acceptedMethod: {
          paymentMethod: paymentMethods,
          transfer: {
            amount: '2.99',
            currency: 'USD'
          }
        },
        paymentCompleteService: paymentCompleteService
      };

      res.status(200);
      res.json(paymentRequest);
      return;
  });

  // movie resource endpoint
  app.options('/movies/dr-strangelove/payments', cors());
  app.post('/movies/dr-strangelove/payments', cors(),
    function(req, res, next) {
      res.status(302);
      res.cookie('moviePass', crypto.randomBytes(16).toString('hex'),
        { maxAge: 900000, httpOnly: true });
      res.setHeader(
        'Location', config.server.baseUri + '/movies/dr-strangelove');
      res.end();
      return;
  });

});
