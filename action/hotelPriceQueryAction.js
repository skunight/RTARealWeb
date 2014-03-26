var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');


var propName     = "供应商"
var modName      = "供应商管理"
var productType  = 'ticket'
var template     = 'hotelPriceQuery'

//view
exports.list = function(req,res){
    //init 如果传过来的有page参数,则用page参数，如果传过来没有page参数,则默认为0
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
//    opt.path="/product/"+productType+"/list?page="+((req.query.current  > 0 ? req.query.current  :  1)-1);
//    opt.method="GET";
//    console.log(opt.path);
    var viewData = {data:{priceData:[{yearMonth:'2013-01',shift:3,days:[{price:100},{price:100},{price:100}]}]}};
    try{
//        var http = new httpClient(opt);
//        http.getReq(function(err,result){
//            var opt1 = {
//                hostname:Config.inf.host,
//                port:Config.inf.port
//            };
//            opt1.path = '/city/shortList';
//            opt1.method='GET';
//            console.log('TicketManagement Step3',new Date());
//            var httpCity = new httpClient(opt1);
//            httpCity.getReq(function(err,result){
//                viewData.cityInfo = result.data;
//                res.render(template,viewData);
//                console.log('TicketManagement Step4',new Date());
//            });
//        });
        res.render(template,viewData);
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        console.log("**********************************************");
        console.log(ret);
    }


};