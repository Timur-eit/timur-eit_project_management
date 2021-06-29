var express = require('express');
var app = express();
var port = 8000;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.get('/numbers', function (req, res) {
    res.send("Hello World!");
});
app.post('/numbers', function (req, res) {
    console.log(req.body);
    res.send("World!!!! " + req.body.data);
});
app.listen(port, function () {
    var date = new Date();
    console.log("Server has been loaded on " + port + " port at " + date);
});
