/**
 * Tests for incoming messages
 */
process.env.NODE_ENV = 'test';

var assert = require('assert');
var server = require('../lib/server.js');
var app = server.app;
 
exports['test incoming signup'] = function() {
    assert.response(app, {
            url: '/listener',
            method: 'POST',
            data: 'bar baz'
        }, {
            body: '/listener',
            status: 200
        }, function(res) {
        console.log('testing');
        // All done, do some more tests if needed
        assert.equal(res.statusCode, 200);
    });
};