/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient.js');
var ejs = require('ejs');

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

exports.updateProvider = function(req,res){
    var params = req.body;
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:"/ent/provider/update/{id}",
        method:"POST"
    };
    try{
        var http = new httpClient(opt);
        var cb;
        http.postRes(params,cb);
        console.log(cb.toString());
    } catch(e){
        console.log(e.message);
    }
    res.json({
        name:'abc',
        contactName:'abcd',
        contactPhone:'13900000000',
        proCode:"123",
        balanceType:"fangshi",
        returnType:"ret",
        remark:"",
        isEnable:true,
        operatorName:"aaaaaaaaaaaaaaaaaaaa"
    });
};

exports.getProviders = function(req,res){
    console.log(req.body);
    var page = 0;
    if(req.body.current){
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
            console.log(err,result);
            ret = result;
            ret.currentPage = page+1;
            console.log(ret)
            res.json(ret);
        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.json(ret);
    }
};