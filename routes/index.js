
/*
 * GET home page.
 */
module.exports = function(app){
//    var ProviderCtrl = require('./../control/ProviderCtrl');
//    var MemberCtrl = require('./../control/MemberCtrl');
//    var ProductCtrl = require('./../control/ProductCtrl');
    var ProviderAction = require('./../action/ProviderAction');
    var ticketManagementAction = require('./../action/ticketManagementAction');
    var Welcome = require('./../action/WelcomeAction');
    app.get('/',function(request,response){
        response.render("index",{});
    });
    app.get('/provider',ProviderAction.viewProviderManger);
    app.post('/provider/add',ProviderAction.addProvider);
    app.post('/provider/detail',ProviderAction.getProviderDetail);
    app.post('/provider/update/:id',ProviderAction.updateProvider);
    app.post('/provider/list',ProviderAction.getProviders);
    app.get('/ticketManagement',ticketManagementAction.viewTicketInfo);
    app.get('/welcome',Welcome.view);
};