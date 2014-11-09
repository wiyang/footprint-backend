var PORT = 3000;

var express = require('express');
var footprintModule = require("./footprint_module");
 
var app = express();

app.disable("etag");
app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + "/static"));
});
 
app.get('/assets/:name', function(req, res) {
    console.log("Requesting asset " + req.params.name);
    res.sendfile(__dirname + "/assets/" + req.params.name);
});

app.get('/api/get', function(req, res) {
    footprintModule.findAll(req, res);
});
app.get('/api/get/:id', function(req, res) {
    footprintModule.findById(req, res);
});
app.get('/api/timeline/getTimelineSlots', function(req, res) {
    footprintModule.findTimelineSlots(req, res);
});
app.get('/api/timeline/getGeoCenter', function(req, res) {
    footprintModule.findGeoCenterByDateTime(req, res);
});

app.post('/api/addFootprint', footprintModule.addFootprint);
app.post('/api/uploadImage', footprintModule.uploadImage);

app.listen(PORT);
console.log('Footprint service backend started on port ' + PORT + '...');
