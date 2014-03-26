/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');
var Paging     = require('./../tools/Paging');



var propName     = "供应商"
var modName      = "供应商管理"
var productType  = 'ticket'
var template     = 'ticketManagement'

//view
exports.list = function(req,res){
    //init 如果传过来的有page参数,则用page参数，如果传过来没有page参数,则默认为0
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path="/product/"+productType+"/list?page="+((req.query.current  > 0 ? req.query.current  :  1)-1);
    console.log(opt.path);
    console.log('TicketManagement Step1',new Date());
    opt.method="GET";
    var viewData = {};
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            viewData.proName   = propName;
            viewData.modName   = modName;
            viewData.data      = result.data;
            console.log('TicketManagement Step2',new Date());
            viewData.pageInfo  = Paging.getPageInfo(req.query,result.totalPage);

            var opt1 = {
                hostname:Config.inf.host,
                port:Config.inf.port
            };
            opt1.path = '/city/shortList';
            opt1.method='GET';
            console.log('TicketManagement Step3',new Date());
            var httpCity = new httpClient(opt1);
            httpCity.getReq(function(err,result){
                viewData.cityInfo = result.data;
                res.render(template,viewData);
                console.log('TicketManagement Step4',new Date());
            });
        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        console.log("**********************************************");
        console.log(ret);
    }


};

exports.add = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path="/product/"+productType+"/create";
    opt.method="POST";
    var params = req.body;
    console.log(params);
    try{
        new httpClient(opt).postReq(params,function(err,response){
            console.log(response);
            res.json(response);
        });
    } catch(e){
        res.json({error:1,errMsg: e.message});
    }
};

exports.update = function(req,res){
    var params = req.body;
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path = "/product/"+productType+"/update/"+req.params.id;
    console.log(opt.path);
    opt.method = "POST"
    try{
        var http = new httpClient(opt);
        console.log(params);
        http.postReq(params,function(err,response){
            res.json(response);
        });
    } catch(e){
        res.json({error:1,errMsg: e.message});
    }
};

exports.viewDetail = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    opt.path = "/product/"+productType+"/detail/"+req.query.id;
    opt.method = 'GET'
    console.log(opt.path);
    var ret = {};
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
           res.json(result);
        });

    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
    }
}