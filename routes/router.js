var express = require('express');
var router = express.Router();

//GET router for reading data
router.get('/', function(req, res, next){
    return res.sendFile(path.join(__dirname + '/templates/index.html'));
});