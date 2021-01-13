var express = require('express'); // import express

var api = require('./API/StockAPI'); // import StockAPI

var app = express();

app.use('/', api);
app.use(express.static('Frontend'));

app.listen(3000, function() {
    console.log('Node app is running on port 3000');
});