var sys = require('sys');
var express = require('express');
var TwilioClient = require('twilio').Client;
var Twiml = require('twilio').Twiml;

// Get settings
var settings = require('./settings/settings.js');


var client = new TwilioClient(settings.twilio.sid, settings.twilio.authToken, 'localhost');


// Let's get a PhoneNumber object
// Note: It is assumed that +16067777777 is a Twilio phone number available from your account
// Another note: You may pass in either a phone number or a phone number sid.
var phone = client.getPhoneNumber('+15106129080');

// Phone.setup() configures the phone number object. It requests the phone number instance
// resource associated with the number and populates an internal data structure representing itself.
// The callback passed in is called when setup completes.
phone.setup(function() {
    // Hey, let's call my parents!
    phone.makeCall('+17705961951', null, function(call) {
        // The callback for makeCall is passed a "call" object.
        // This object is an event emitter.
        call.on('answered', function(reqParams, res) {
            // Here, reqParams is a map of the POST vars Twilio sent when it requested our auto-uri
            // res is a Twiml.Response object.
            // We can "append" Twiml elements to res. Let's append a Say verb element.
            res.append(new Twiml.Say('Hi, this is a robot!'));
            res.send();
        });
    });
});





// Configure and start express server
var app = express.createServer();

// Create routes
app.get('/', function(req, res) {
    res.send('ComTxt');
});

app.listen(3000);
console.log('Server start on port 3000');