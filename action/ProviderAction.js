/**
 * Created by cloudbian on 14-3-14.
 */
var httpClient = require('./../tools/HttpClient.js');
exports.viewProviderManger = function(req,res){
    //todo 获取列表

    res.render("providerManagement",{proName:"不知道",modName:"供应商管理",currentPage:1,totalPage:10,totalCount:200});
};
exports.addProvider = function(req,res){
    var params = req.body;
    req.body.operator = "283shs73hs32he2h232323";
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:'/ent/provider/create',
        method:'POST'
    };
    try{
        var http = new httpClient(opt);
        var cb;
        http.postRes(params,cb);
    } catch(e){
        console.log(e.message);
    }

    res.json({name:cb});
}

exports.updateProvider = function(req,res){
    var params = req.body;
    var opt = {
        hostname:'172.16.0.15',
        port:3000,
        path:' /ent/provider/update/{id}',
        method:'POST'
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