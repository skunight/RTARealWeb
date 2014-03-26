/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient = require('./../tools/HttpClient.js');
var config = require('./../tools/Config.js');
var async = require('async');
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
                        console.log(ret);
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
    var params="?page=0&pageSize=10";
    if(req.body.name&&""!==req.body.name){
        params +="&name="+req.body.name;
    }
    if(req.body.city&&""!==req.body.city){
        params +="&city="+req.body.city;
    }
    var opt = {
        hostname:config.inf.host,
        port:config.inf.port,
        path:"/product/hotel/shortList"+params,
        method:"GET"
    };
    try{
        new httpClient(opt).getReq(function(err,result){
            console.log(result);
            if(result.error===0){
                console.log(result.data);
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
//
//exports.addPMember = function(req,res){
//    var params = req.body;
//    var opt = {
//        hostname:'172.16.0.15',
//        port:3000,
//        path:"/ent/provider/member/create",
//        method:"POST"
//    };
//    try{
//        new httpClient(opt).postReq(params,function(err,response){
////                    console.log("save provider Member finish..."+err+","+response);
//            res.json({error:response.error,errMsg:response.errorMsg});
//        });
//    } catch(e){
//        console.log(e.message);
//        res.json({error:1,errMsg: e.message});
//    }
//};
//

//exports.getProviderMember = function(req,res){
//    var opt = {
//        hostname:'172.16.0.15',
//        port:3000,
//        path:"/ent/provider/member/detail/"+req.body.id,
//        method:"GET"
//    };
//    try{
//        var http = new httpClient(opt);
//        http.getReq(function(err,result){
//            res.json(result);
//        });
//    } catch(e){
//        console.log(e.message);
//        res.json({error:1,errMsg: e.message});
//    }
//};
//
//exports.getProviderMembersList = function(req,res){
//    var params;
//    var page = 0;
//    if(req.body.current&&req.body.current>0){
//        page = req.body.current-1;
//    }
//    params = "page="+page;
//    //check
//    if(req.body.searchMobile&&null!==req.body.searchMobile&&""!==req.body.searchMobile){
//        params += "&mobile="+req.body.searchMobile;
//    }
//    if(req.body.searchName&&null!==req.body.searchName&&""!==req.body.searchName){
//        params += "&name="+req.body.searchName;
//    }
//    if(req.body.searchEmail&&null!==req.body.searchEmail&&""!==req.body.searchEmail){
//        params += "&email="+req.body.searchEmail;
//    }
//    if(req.body.searchProvider&&null!==req.body.searchProvider&&""!==req.body.searchProvider){
//        params += "&provider="+req.body.searchProvider;
//    }
//    if(req.body.searchisEnable&&null!==req.body.searchisEnable&&""!==req.body.searchisEnable){
//        params += "&isEnable="+req.body.searchisEnable;
//    }
//    console.log(params);
//    //req
//    var opt = {
//        hostname:'172.16.0.15',
//        port:3000,
//        path:"/ent/provider/member/list?"+params,
//        method:"GET"
//    };
//    console.log(params);
//    var ret = {};
//    try{
//        new httpClient(opt).getReq(function(err,result){
//            ret = result;
//            ret.currentPage = page+1;
//            res.json(ret);
//        });
//    } catch(e){
//        ret.error = 1;
//        ret.errMsg = e.message+"，请联系管理员！";
//        res.json(ret);
//    }
//
//};