/**
 * Tests for incoming messages
 */
exports['test incoming signup'] = function() {
    assert.response(server, {
            url: '/listener',
            method: 'POST',
            data: 'bar baz'
        }, {
            body: '/listener',
            status: 200
        }, function(res) {
        
        // All done, do some more tests if needed
    });
};