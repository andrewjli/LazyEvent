var express = require('express');

var app = express();
app.use(express.urlencoded());

app.post('/inbound', function(request, response) {
    response.type('text/xml');
    response.send('<Response><Say>Hello there! Thanks for calling.</Say></Response>');
});

app.listen(3000);