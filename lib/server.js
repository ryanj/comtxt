var sys = require('sys');
var express = require('express');
var TwilioClient = require('twilio').Client;
var Twiml = require('twilio').Twiml;
var comtxt = require('./comtxt.js');
var port = 3333;

// Get settings
var settings = require('./settings/settings.js');

// Database connection
var cradle = require('cradle');
var db = new(cradle.Connection)(settings.database.hostname, settings.database.port).database('participants');


// Set up Twillio client
var client = new TwilioClient(settings.twilio.sid, settings.twilio.authToken, 'localhost');
var phone = client.getPhoneNumber(settings.twilio.phone);

// Send some texts
//var numbers = ['+17705961951', '+15106129080'];
// comtxt.sendGroupSMS(numbers, 'Testing', phone);


// Configure and start express server
var app = express.createServer();

// Create routes
app.post('/listener', function(req, res) {
    // Organizer can send out a message
        // Send out to people in database

    // Partipant can sign up
        // Save to database
    
    var message = '#signup';
    if (message.indexOf('#signup', message)) {
        var data = {
            'phone': '',
            'context': 'testing'
        };
        
        // TODO: Check duplicates
        
        // Save to databse
        db.save(data, function (err, res) {
            console.log(res);
        });
    }
    
});

// Handle testing
if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
    console.log('Server started on port: ' + port);
}
exports.app = app;