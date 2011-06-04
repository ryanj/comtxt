/**
 * Tests for incoming messages
 */
process.env.NODE_ENV = 'test';

var assert = require('assert');
var server = require('../lib/server.js');
var app = server.app;
 
var data = '?AccountSid=ACddeb9ae15539be5e39c6e78c1baae11c&Body=subscribe&ToZip=55419&FromState=CA&ToCity=MINNEAPOLIS&SmsSid=SM34b3b30978125a7e8ec047c94fc770f5&ToState=MN&To=+16122853984&ToCountry=US&FromCountry=US&SmsMessageSid=SM34b3b30978125a7e8ec047c94fc770f5&ApiVersion=2010-04-01&FromCity=OAKLAND&SmsStatus=received&From=+15106129080&FromZip=94704';
 
exports['test incoming signup'] = function() {
    assert.response(app, {
            url: '/listener' + data,
            method: 'GET'
        }, {
            body: 'data',
            status: 200
        }, function(res) {
        
        console.log('testing');
        assert.equal(res.statusCode, 200);
    });
};

var data = '?AccountSid=ACddeb9ae15539be5e39c6e78c1baae11c&Body=This+is+an+admin+post&ToZip=55419&FromState=CA&ToCity=MINNEAPOLIS&SmsSid=SM34b3b30978125a7e8ec047c94fc770f5&ToState=MN&To=+16122853984&ToCountry=US&FromCountry=US&SmsMessageSid=SM34b3b30978125a7e8ec047c94fc770f5&ApiVersion=2010-04-01&FromCity=OAKLAND&SmsStatus=received&From=+17705961951&FromZip=94704';
 
exports['test incoming admin message'] = function() {
    assert.response(app, {
            url: '/listener' + data,
            method: 'GET'
        }, {
            body: 'data',
            status: 200
        }, function(res) {
        
        console.log('testing admin');
        assert.equal(res.statusCode, 200);
    });
};

