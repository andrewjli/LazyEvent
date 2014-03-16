// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC3be41d17da098e2a805c590ccb2c5e00';
var authToken = '0075916a20e97ec65cb2f76c00f6fd5b';
var client = require('twilio')(accountSid, authToken);
  
client.sms.messages.create({
    body: "lol",
    to: "+447597576473",
    from: "+441424400057"
}, function(err, message) {
    process.stdout.write(message.sid);
});
