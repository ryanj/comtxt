var sys = require('sys');
var express = require('express');
var TwilioClient = require('twilio').Client;
var Twiml = require('twilio').Twiml;
var comtxt = require('lib/comtxt.js');
var port = 3333;
var hostTest = 'http://lamontnelson.com/foo.php';

// Get settings
if (process.env.COMTXT_SID) {
    settings = {};
    settings.twilio = {
        'sid': process.env.COMTXT_SID,
        'authToken': process.env.COMTXT_AUTH,
        'hostname': '',
        'phone': '+16122853984'
    };
    settings.database = {
        'hostname': 'http://comtxt.iriscouch.com',
        'port': '5984',
        'user': '',
        'password': ''
    };
}
else {
    var settings = require('./settings/settings.js');
}

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
app.get('/listener', express.bodyParser(), function(req, res) {
    var data = req.body = req.body || {};
    var isAdmin = false;
    
    // Fake some data
    var phoneNumber = req.query.From;
    phoneNumber = phoneNumber.replace(/^\s+|\s+$/g,"");
    var message = req.query.Body;
    var adminPhone = '17705961951';

    // Organizer can send out a message
        // Send out to people in database
    if (phoneNumber == adminPhone) {
        isAdmin = true;
        // Send out messages to all particpants
        db.all({ 'include_docs':'true' }, function(err, docs) {
            for (var i in docs) {
                comtxt.sendGroupSMS([ docs[i].doc.phone ], message, phone);
            }
        });
    }

    // If partipant is signing up, so save to database
    if (message.indexOf('subscribe', message) >= 0 && isAdmin == false) {
        var data = {
            'phone': phoneNumber,
            'context': 'testing',
            'message': message
        };
        // TODO: Check duplicates
        
        // Save to databse
        db.save(data, function (err, res) {
            console.log('saved');
            console.log(res);
        });
    }
    
    res.send('data');
});

// Handle testing
if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
    console.log('Server started on port: ' + port);
}
exports.app = app;
