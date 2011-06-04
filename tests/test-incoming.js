/**
 * Tests for incoming messages
 */
var server = require('./lib/server.js');
 
exports['test incoming signup'] = function() {
    assert.response(server, {
            url: '/listener',
            method: 'POST',
            data: 'bar baz'
        }, {
            body: '/listener',
            status: 200
        }, function(res) {
        console.log('testing');
        // All done, do some more tests if needed
    });
};