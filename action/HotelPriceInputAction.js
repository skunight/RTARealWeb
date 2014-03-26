/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var async = require('async');
var underscore = require('underscore');
exports.viewHotelPriceInput = function(req,res){
    var ret;
        async.waterfall([
            //get list
            function(cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/product/hotel/priceLog/list?page=0&status=1",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret = result;
                        ret.currentPage = 1;
                        if(result.totalPage===0){
                            ret.totalPage++;
                        }
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }

                });
            },
            //get short providers name list
            function(r,cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/provider/shortList",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret.providerNames = result.data;
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }
                });
            },
            //get city list
            function(r,cb){
                var opt = {
                    hostname:config.inf.host,
                    port:config.inf.port,
                    path:"/city/shortList",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret.citys = result.data;
                        ret.proName = "酒店";
                        ret.modName = "价格录入";
                        cb(err,result);
                        res.render("hotelPriceInput",ret);
                    }else{
                        throw "error,pls contact admin!";
                    }

                });
            }
        ],function(error,errMsg){
            if(null!=error){
                console.log(error+","+errMsg);
            }
        });
};

//autocompelete product name
exports.getProductNames = function(req,res){
    var params="?limit=10";
    if(req.query.name&&""!==req.query.name.trim()){
        params +="&name="+req.query.name.trim();
    }
    if(req.query.city&&""!==req.query.city){
        params +="&city="+req.query.city;
    }
    var productType = "";
    if(req.params.productType&&""!==req.params.productType){
        productType = req.params.productType;
    }

    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/product/"+productType+"/shortList"+params,
        method:"GET"
    };
    try{
        new httpClient(opt).getReq(function(err,result){
            if(result.error===0){
                var ret = [];
                result.data.forEach(function(obj){
                    var row = {};
                    row.label = obj.name;
                    row.value = obj._id;
                    ret.push(row);
                });
                res.json(ret);
            }else{
                throw "error,pls contact admin!";
            }

        });
    } catch(e){
        console.log(e.message);
        res.json([]);
    }
};

exports.addInputLog = function(req,res){
    var params = req.body;
    params.startDate = new Date(params.startDate).getTime();
    params.endDate = new Date(params.endDate).getTime();
    delete params.addCity;
    if(!underscore.isArray(params.weekend)){
        params.weekend = [params.weekend];
    }
    var opt = {
        hostname:config.inf.host,
        port:config.inf.host,
        path:"/product/hotel/price/create",
        method:"POST"
    };
    try{
        console.log("params::::::::::::"+JSON.stringify(req.body));
        new httpClient(opt).postReq(params,function(err,response){
                    console.log("save finish..."+err,response);
//            res.json({error:response.error,errMsg:response.errorMsg});
            res.json({error:0});
        });

    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};


exports.getHotelPriceLogList = function(req,res){
    var params;
    var page = 0;
    if(req.body.current&&req.body.current>0){
        page = req.body.current-1;
    }
    params = "page="+page;
    //check
    if(req.body.product&&null!==req.body.product&&""!==req.body.product){
        params += "&product="+req.body.product;
    }
    if(req.body.startDate&&null!==req.body.startDate&&""!==req.body.startDate){
        params += "&startDate="+req.body.startDate;
    }
    if(req.body.endDate&&null!==req.body.endDate&&""!==req.body.endDate){
        params += "&endDate="+req.body.endDate;
    }
    if(req.body.operator&&null!==req.body.operator&&""!==req.body.operator){
        params += "&operator="+req.body.operator;
    }
    if(req.body.provider&&null!==req.body.provider&&""!==req.body.provider){
        params += "&provider="+req.body.provider;
    }
    if(req.body.status&&null!==req.body.status&&""!==req.body.status){
        params += "&status="+req.body.status;
    }
    //req
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/product/hotel/priceLog/list?"+params,
        method:"GET"
    };

    var ret = {};
    try{
        new httpClient(opt).getReq(function(err,result){
            if(result.error===0){
                ret = result;
                ret.currentPage = 1;
                if(result.totalPage===0){
                    ret.totalPage++;
                }
                res.json(ret);
            }else{
                throw "error,pls contact admin!";
            }

        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.json(ret);
    }

};