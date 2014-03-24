
/*
 * GET home page.
 */
module.exports = function(app){
//    var ProviderCtrl = require('./../control/ProviderCtrl');
//    var MemberCtrl = require('./../control/MemberCtrl');
//    var ProductCtrl = require('./../control/ProductCtrl');
    var FileUploadAction = require('../action/FileUploadAction');
    var ProviderAction = require('./../action/ProviderAction');
    var ProviderMemberAction = require('./../action/ProviderMemberAction');
    var ticketManagementAction = require('./../action/ticketManagementAction');
    var MemberAction = require('./../action/MemberAction');
    var HotelPriceInputAction = require('./../action/HotelPriceInputAction');
    app.get('/',function(request,response){
        response.render("index",{});
    });
    app.post('/login',MemberAction.login);
    //provider
    app.get('/provider',ProviderAction.viewProviderManger);
    app.post('/provider/add',ProviderAction.addProvider);
    app.post('/provider/detail',ProviderAction.getProviderDetail);
    app.post('/provider/update/:id',ProviderAction.updateProvider);
    app.post('/provider/list',ProviderAction.getProviders);
    //providerMember
    app.get('/providerMember',ProviderMemberAction.viewProviderMemberManager);
    app.post('/providerMember/add',ProviderMemberAction.addPMember);
    app.post('/providerMember/detail',ProviderMemberAction.getProviderMember);
    app.post('/providerMember/update/:id',ProviderMemberAction.updatePMember);
    app.post('/providerMember/list',ProviderMemberAction.getProviderMembersList);
    //hotel price input
    app.get('/hotelPriceInput',HotelPriceInputAction.viewHotelPriceInput);
    //file upload
    app.post('/file-upload', FileUploadAction.fileUpload);

};