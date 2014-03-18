
/*
 * GET home page.
 */
module.exports = function(app){
//    var ProviderCtrl = require('./../control/ProviderCtrl');
//    var MemberCtrl = require('./../control/MemberCtrl');
//    var ProductCtrl = require('./../control/ProductCtrl');
    var ProviderAction = require('./../action/ProviderAction');
    var ticketManagementAction = require('./../action/ticketManagementAction');
    app.get('/',function(request,response){
        response.render("index",{});
    });
    app.get('/provider',ProviderAction.viewProviderManger);
    app.post('/provider/add',ProviderAction.addProvider);
    app.post('/provider/update',ProviderAction.updateProvider);
    app.post('/provider/list',ProviderAction.getProviders);
    app.get('/ticketManagementAction',ticketManagementAction.viewTicketInfo);
};