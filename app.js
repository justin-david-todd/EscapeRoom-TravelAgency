var express = require('express');
var app = express();

app.use(express.static('public'));

var port = 60633;

app.listen(port, function() {
    console.log(`listening on port ${port}!`)
});
