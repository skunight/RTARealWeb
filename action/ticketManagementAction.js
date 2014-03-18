/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient.js');
var ejs = require('ejs');
var opt = {
    hostname:'172.16.0.15',
    port:3000
};
//view
exports.viewTicketInfo = function(req,res){
    //init
    opt.path="/product/ticket/list?page=0";
    opt.method="GET";
    var ret = {};
    try{
        var http = new httpClient(opt);
        http.getRes(function(err,result){
            ret.proName = "供应商";
            ret.modName = "供应商管理";
            ret.currentPage =1;
            ret.totalPage = result.totalPage;
            ret.data = result.data;
            res.render("ticketManagement",ret);
        });

    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        console.log("**********************************************");
        console.log(ret);
    }


};

exports.addProvider = function(req,res){
    var params = req.body;
    opt.path="/ent/provider/create";
    opt.method="POST";
    try{
        new httpClient(opt).postRes(params,function(err,response){
//                    console.log("save provider finish..."+err+","+response);
            res.json({error:0,errMsg:""});
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};
//
//exports.updateProvider = function(req,res){
//    var params = req.body;
//    opt.path="/ent/provider/update/{id}";
//    opt.method="POST";
//    try{
//        var http = new httpClient(opt);
//        var cb;
//        http.postRes(params,cb);
//        console.log(cb.toString());
//    } catch(e){
//        console.log(e.message);
//    }
//    res.json({
//        name:'abc',
//        contactName:'abcd',
//        contactPhone:'13900000000',
//        proCode:"123",
//        balanceType:"fangshi",
//        returnType:"ret",
//        remark:"",
//        isEnable:true,
//        operatorName:"aaaaaaaaaaaaaaaaaaaa"
//    });
//};
//
//exports.getProviders = function(req,res){
//    console.log(req.body);
//    var page = 0;
//    if(req.body.current){
//        page = req.body.current-1;
//    }
//    opt.path="/ent/provider/list?page="+page;
//    opt.method="GET";
//    var ret = {};
//    try{
//        var http = new httpClient(opt);
//        http.getRes(function(err,result){
//            ret = JSON.parse(result);
//            ret.currentPage = page+1;
//            console.log(ret)
//            res.json(ret);
//        });
//    } catch(e){
//        ret.error = 1;
//        ret.errMsg = e.message+"，请联系管理员！";
//        res.json(ret);
//    }
//};