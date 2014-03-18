/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient.js');

//view
exports.viewProviderManger = function(req,res){
    //init
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:"/ent/provider/list?page=0",
        method:"GET"
    };

    var ret = {};
    try{
        var http = new httpClient(opt);
        http.getRes(function(err,result){
            ret = result;
            ret.proName = "供应商";
            ret.modName = "供应商管理";
            ret.currentPage =1;
            res.render("providerManagement",ret);
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
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:"/ent/provider/create",
        method:"POST"
    };
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

//detail
exports.getProviderDetail = function(req,res){
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:"/ent/provider/detail/"+req.body.id,
        method:"GET"
    };
    try{
        var http = new httpClient(opt);
        http.getRes(function(err,result){
            res.json(result);
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};

exports.updateProvider = function(req,res){
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+req.params.id);
    var params = req.body;
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:"/ent/provider/update/"+req.params.id,
        method:"POST"
    };
    try{
        var http = new httpClient(opt);
        http.postRes(params,function(err,result){
            res.json(result);
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }
};

exports.getProviders = function(req,res){
    var page = 0;
    if(req.body.current&&req.body.current>0){
        page = req.body.current-1;
    }
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:"/ent/provider/list?page="+page,
        method:"GET"
    };
    var ret = {};
    try{
        new httpClient(opt).getRes(function(err,result){
            ret = result;
            ret.currentPage = page+1;
            res.json(ret);
        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.json(ret);
    }
};