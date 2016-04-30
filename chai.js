/* Require hook to setup babel  */
require('babel-core/register');
require('babel-polyfill');

var chai = require('chai');
var loadtest = require('loadtest');
var sinon = require('sinon');

// Global variables
global.expect = chai.expect;
global.loadtest = loadtest;
global.sinon = sinon;
global.sandbox = sinon.sandbox;

global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

