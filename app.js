var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('port', 60633);

app.listen(app.port, function() {
    console.log(`listening on port ${app.port}!`)
});
