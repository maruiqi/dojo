var express = require('express');
var {postcodeString,barcodeString} =require('./src/codeTransform')
var app = express();

app.get('/postcodeTobarcode/:postcod', function(req, res) {
    let barcode = postcodeString(req.params.postcod);
    if (barcode==='error!') {
        res.sendStatus(400);
    }
    else{
        res.send(barcode);
        res.sendStatus(200);
    }
});


app.get('/barcodeTopostcode/:barcode', function(req, res) {
    let postcode = barcodeString(req.params.barcode );
    if (postcode==='error!') {
        res.sendStatus(400);
    }
    else{
        res.send(postcode);
        res.sendStatus(200);
    }
});
app.listen(3005, function () {
    console.log('Server listening at http://localhost:3005');
});