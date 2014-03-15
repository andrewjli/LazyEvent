// Load the twilio module
var twilio = require('twilio');
 
var client = new twilio.RestClient('AC3be41d17da098e2a805c590ccb2c5e00', '0075916a20e97ec65cb2f76c00f6fd5b');
 
client.sms.messages.create({
    to:'+44597576473',
    from:'441424400057',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});

