define([
  'angular'
], function(angular) {

'use strict';

var module = angular.module('merchant-demo', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Welcome',
      templateUrl: requirejs.toUrl('merchant-demo/landingPage.html')
    });
});

});
