/**
 * Created by zzy on 3/28/14.
 */
var HttpClient = require('./../../tools/HttpClient.js');
var Config = require('./../../tools/Config');

exports.noticeList = function(request,response){
    response.render('web/goverNotice',{});
};