var sys = require('sys');
var express = require('express');
var TwilioClient = require('twilio').Client;
var Twiml = require('twilio').Twiml;
var comtxt = require('./comtxt.js');

// Get settings
var settings = require('./settings/settings.js');

// Set up Twillio client
var client = new TwilioClient(settings.twilio.sid, settings.twilio.authToken, 'localhost');
var phone = client.getPhoneNumber('+16122853984');


// Send some texts
var numbers = ['+17705961951', '+15106129080'];
comtxt.sendGroupSMS(numbers, 'Testing', phone);



// Configure and start express server
var app = express.createServer();

// Create routes
app.get('/', function(req, res) {
    res.send('ComTxt');
});

app.listen(3000);
console.log('Server start on port 3000');