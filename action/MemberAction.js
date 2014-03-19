/**
 * Created by zzy on 3/19/14.
 */
var HttpClient = require('./../tools/HttpClient.js');
var async = require('async');
exports.login = function(request,response){
    async.waterfall([
        function(cb){
            var client = new HttpClient({
                hostname:'172.16.0.15',
                port:3000,
                path:'/member/login',
                method:'POST'
            });
            client.postRes({
                'mobile':request.body.mobile,
                'passwd':request.body.passwd
            },cb);
        },
        function(member,cb){
            var client = new HttpClient({
                hostname:'172.16.0.15',
                port:3000,
                path:'/module/shortList',
                method:'GET'
            });
            client.getRes(function(err,res){
                if(member.data!=null&&res.data!=null){
                    request.session.user = member.data;
                    cb(null,res);
                } else {
                    cb('用户名或密码错误！',null)
                }
            });
        }
    ],function(err,res){
        if(err){
            response.render('index',{});
        } else {
            if(request.session.user!=null){
                var result = {};
                var cat;
                for(var i in res.data){
                    if(cat!==res.data[i].cat){
                        cat = res.data[i].cat;
                        result[res.data[i].cat]=[];
                    }
                    result[res.data[i].cat].push(res.data[i]);
                }
                request.session.user.modules = result;
            }
            response.render('welcome',{});
        }
    });
};