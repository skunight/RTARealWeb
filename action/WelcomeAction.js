var httpClient = require('./../tools/HttpClient.js');
var ejs = require('ejs');
var opt = {
    hostname:'172.16.0.15',
    port:3000
};

exports.view = function(req,res){
    //init
    var ret={};
    res.render("welcome",ret);
}