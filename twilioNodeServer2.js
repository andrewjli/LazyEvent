//Initialize a REST client in a single line:
var client = require('twilio') ('AC3be41d17da098e2a805c590ccb2c5e00', '0075916a20e97ec65cb2f76c00f6fd5b');
 
// Use this convenient shorthand to send an SMS:
client.sendSms({
    to:'+44597576473',
    from:'+441424400057',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});

