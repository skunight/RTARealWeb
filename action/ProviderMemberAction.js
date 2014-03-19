/**
 * Created by cloudbian on 14-3-19.
 */
var httpClient = require('./../tools/HttpClient.js');
var async = require('async');
exports.viewProviderMemberManager = function(req,res){
    var ret={};
        async.waterfall([
            //get list
            function(cb){
                var opt = {
                    hostname:'172.16.0.15',
                    port:3000,
                    path:"/ent/provider/member/list?page=0",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        ret.data = result.data;
                        ret.currentPage = 0;
                        cb(err,result);
                    }else{
                        throw "error,pls contact admin!";
                    }

                });
            },
            //get short providers name list
            function(r,cb){
                var opt = {
                    hostname:'172.16.0.15',
                    port:3000,
                    path:"/provider/shortList",
                    method:"GET"
                };
                new httpClient(opt).getReq(function(err,result){
                    if(result.error===0){
                        r.providerNames = result.data;
                        cb(err,result);
                        res.render("providerMemberManagement",r);
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

exports.addPMember = function(req,res){

};

exports.updatePMember = function(req,res){

};

exports.getProviderMember = function(req,res){

};

exports.getProviderMembersList = function(req,res){

};