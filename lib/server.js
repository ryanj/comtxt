var sys = require('sys');
var express = require('express');
var TwilioClient = require('twilio').Client;
var Twiml = require('twilio').Twiml;


//var client = new TwilioClient(MY_ACCOUNT_SID, MY_AUTH_TOKEN, 'localhost');

// Configure and start express server
var app = express.createServer();

// Create routes
app.get('/', function(req, res) {
    res.send('ComTxt');
});

app.listen(3000);
console.log('Server start on port 3000');