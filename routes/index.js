
/*
 * GET home page.
 */
module.exports = function(app){
//    var ProviderCtrl = require('./../control/ProviderCtrl');
//    var MemberCtrl = require('./../control/MemberCtrl');
//    var ProductCtrl = require('./../control/ProductCtrl');
    var ProviderAction = require('./../action/ProviderAction');
    var ticketManagementAction = require('./../action/ticketManagementAction');
    var MemberAction = require('./../action/MemberAction');
    app.get('/',function(request,response){
        response.render("index",{});
    });
    app.post('/login',MemberAction.login);

    app.get('/provider',ProviderAction.viewProviderManger);
    app.post('/provider/add',ProviderAction.addProvider);
    app.post('/provider/detail',ProviderAction.getProviderDetail);
    app.post('/provider/update/:id',ProviderAction.updateProvider);
    app.post('/provider/list',ProviderAction.getProviders);
    app.get('/ticketManagementAction',ticketManagementAction.viewTicketInfo);


    app.post('/file-upload', function(req, res, next) {
        res.contentType('json');
        var UPYun = require('./../models/UPCloud/upyun').UPYun;
        var upyun = new UPYun("***", "***", "***");
        var md5 = function(string) {
            var crypto = require('crypto');
            var md5sum = crypto.createHash('md5');
            md5sum.update(string, 'utf8');
            return md5sum.digest('hex');
        };
        var fs =  require('fs');
        var fileContent = fs.readFileSync(req.files.file.path);
        var md5Str = md5(fileContent);
        upyun.setContentMD5(md5Str);

        upyun.writeFile('/'+req.files.file.name, fileContent, false, function(err, data){
            if (err) {throw err};
            fs.unlink(req.files.file.path, function() {
                if (err) throw err;
                res.send({"src":req.files.file.name});
            });
        });
    });
};