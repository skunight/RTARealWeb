/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient.js');
var opt = {
    hostname:'172.16.0.15',
    port:3000
};
//view
exports.viewProviderManger = function(req,res){
    var currentPage = 0;
    if(req.body.currentPage){
        currentPage = req.body.currentPage;
    }
    opt.path="/ent/provider/list?page="+currentPage;
    opt.method="GET";
    var ret = {};
    try{
        var http = new httpClient(opt);
        http.getRes(function(err,result){
            ret = JSON.parse(result);
            ret.proName = "供应商";
            ret.modName = "供应商管理";
            ret.currentPage = currentPage;
            ret.totalPage +=1;
            ret.currentPage +=1;
            console.log(ret)
            res.render("providerManagement",ret);
        });
    } catch(e){
        ret.error = 1;
        ret.errMsg = e.message+"，请联系管理员！";
        res.render("providerManagement",ret);
    }


};
exports.addProvider = function(req,res){
    var params = req.body;
    opt.path="/ent/provider/create";
    opt.method="POST";
    try{
        var http = new httpClient(opt);
        http.postRes(params,function(err,response){
        });
        //refresh table
        opt.path="/ent/provider/list";
        opt.method="GET";
        http = new httpClient(opt);
        http.getRes(function(err,result){
            var ret = {};
            ret = JSON.parse(result);
            ret.proName = "供应商";
            ret.modName = "供应商管理";
            ret.currentPage = currentPage;
            ret.totalPage +=1;
            ret.currentPage +=1;
            console.log(ret+"aaaaa");
            res.json(ret);
        });
    } catch(e){
        console.log(e.message);
        res.json({error:1,errMsg: e.message});
    }


};

exports.updateProvider = function(req,res){
    var params = req.body;
    opt.path="/ent/provider/update/{id}";
    opt.method="POST";
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