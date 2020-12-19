var express = require('express');

var api = require('./StockAPI');

var app = express();

app.use('/', api);
app.use(express.static('Frontend'));


app.listen(3000, function() {
    console.log('Node app is running on port 3000');
});