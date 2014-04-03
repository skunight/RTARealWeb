/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient');
var Config     = require('./../tools/Config');
var Paging     = require('./../tools/Paging');
var _ = require('underscore');
var  querystring  = require('querystring');
var timeZone = ' 00:00:00 +08:00';



var propName     = "供应商"
var modName      = "供应商管理"
var productType  = 'package'
var template     = productType+'Management'

//render search and modal
exports.init = function(req,res){
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    var viewData = {};
    if(_.isEmpty(req.session.user.modules)){
        res.render("index",{error:1,errorMsg:"无法读取模块列表！"});
    }if(_.isEmpty(req.session.user.mobile)){
        res.render("index",{error:1,errorMsg:"无法读取手机号！"});
    }if(_.isEmpty(req.session.user._id)){
        res.render("index",{error:1,errorMsg:"无法读取用户编号！"});
    }
    try{
        opt.path = '/city/shortList';
        opt.method='GET';
//        console.log('TicketManagement Step3',new Date());
        var httpCity = new httpClient(opt);
        httpCity.getReq(function(err,result){
            viewData.cityInfo = result.data;
            viewData.userModules = req.session.user.modules;
            viewData.user={};
            viewData.user.mobile=req.session.user.mobile;
            viewData.user._id=req.session.user._id;
            res.render(template,viewData);
        });
    } catch(e){
        var ret={};
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        console.log(ret);
    }
};

//view list
exports.list = function(req,res){
    //init 如果传过来的有page参数,则用page参数，如果传过来没有page参数,则默认为0
    var opt = {
        hostname:Config.inf.host,
        port:Config.inf.port
    };
    var requestPage = _.isEmpty(req.query.current)?0:req.query.current-1;
    var otherParams = {
         city:req.query.searchCity
        ,effectDate:_.isEmpty(req.query.searchEffect)?undefined:new Date(req.query.searchEffect+timeZone).getTime()
        ,expiryDate:_.isEmpty(req.query.searchExpiry)?undefined:new Date(req.query.searchExpiry+timeZone).getTime()
        ,isEnable:req.query.searchIsEnable
        ,name:req.query.searchName
        ,pageSize:Config.inf.pageSize
    };
    otherParams = querystring.stringify(otherParams);
    opt.path="/product/"+productType+"/list?page="+requestPage+'&'+otherParams;
    console.log(opt.path);
    opt.method="GET";
    var viewData = {};
    try{
        var http = new httpClient(opt);
        http.getReq(function(err,result){
            viewData = result;
            viewData.pageInfo  = Paging.getPageInfo(req.query,result.totalPage,'packageManagement/list',otherParams);
            res.json(viewData);
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
    params.effectDate = new Date(params.effectDate+timeZone).getTime();
    params.expiryDate = new Date(params.expiryDate+timeZone).getTime();
    console.log('PackageManagementAction add params',params);
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

    var opt = {
        hostname:Config.inf.host
        ,port:Config.inf.port
        ,method:"POST"
        ,path:"/product/"+productType+"/update/"+req.params.id
    };
    console.log(opt.path);
    var params = req.body;
    params.effectDate = new Date(params.effectDate+timeZone).getTime();
    params.expiryDate = new Date(params.expiryDate+timeZone).getTime();
    console.log('PackageManagementAction update params',params);
    try{
        var http = new httpClient(opt);
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
    opt.path = "/product/"+productType+"/detail/"+req.params.id;
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