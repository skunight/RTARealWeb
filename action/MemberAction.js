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
            },function(err,res){
                if(res){
                    request.session.user=res.data;
                    cb(null,res);
                } else {
                    cb(err,null);
                }
            });
        },
        function(member,cb){
            var client = new HttpClient({
                hostname:'172.16.0.15',
                port:3000,
                path:'/module/shortList',
                method:'GET'
            });
            client.getRes(cb);
        }
    ],function(err,res){
        if(err){
            response.render('index',{});
        } else {
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
            response.render('welcome',{});
        }
    });
};