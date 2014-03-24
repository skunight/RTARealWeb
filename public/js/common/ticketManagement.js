var images=[];

$('#showCreate').click(function(){
    $('#modalType').html('新增');
    $('#isEnable').bootstrapSwitch('state',true);
//    $('#isEnable').bootstrapSwitch('state',false);
//    $('#isEnable').bootstrapSwitch('state',true);
//    $('#isEnable').bootstrapSwitch('state',true);
//    $('#isEnable').bootstrapSwitch('state',true);

});


$('#showEdit').click(function(){
    $('#modalType').html('编辑');
    $(this).button("loading");
    var _id = $('#selectedId').val();

    if(""===_id||undefined===_id||_id.length<=0){
        alert("请选择需要编辑的产品！");
        $('#showEdit').button("reset");
    }else{
        $.ajax({
            type: "get",
            url: "/ticketManagement/detail",
            cache:false,
            data:{id:_id}
        }).done(function(data, textStatus){
                if(data.error===0){

                    //insert Data
                    $('#name').val(data.data.name);
                    $('#content').val(data.data.content);
                    $('#intro').val(data.data.intro);
//                    $('#image').val(data.data.image);
//                    $('#city').val(data.data.city);
                    $('#addr').val(data.data.addr);
                    $('#lat').val(data.data.gps.lat);
                    $('#lon').val(data.data.gps.lon);
                    $('#level').val(data.data.level);
                    $('#openTime').val(data.data.openTime);
                    $('#bookRule').val(data.data.bookRule);
                    $('#useRule').val(data.data.useRule);
                    $('#cancelRule').val(data.data.cancelRule);
                    $('#transportation').val(data.data.transportation);
                    $('#effectDate').val(data.data.effectDate);
                    $('#expiryDate').val(data.data.expiryDate);
                    $('#isEnable').val(data.data.isEnable);
                    $('#contactName').val(data.data.contactName);
                    $('#tel').val(data.data.tel);
                    $('#fax').val(data.data.fax);
                    $('#type').val(data.data.type);
//                    $('#subType').val(data.data.subType);
//                    $('#operatorName').val(data.data.operatorName);
//                    把数据填充完毕以后再显示详情
                    $('#createModal').modal("show");
//                    console.log(data);
                }else{
                    alert("获取详情出错："+data.errMsg);
                }
            }).fail(function(){
                    alert("网络异常，请重试！");
            }).always(function(){
                $('#showEdit').button("reset");
            });
    }
});


$('#doUpload').click(function(e){
    e.preventDefault();
    var formData = new FormData($('#fileuploadform')[0])
    $.ajax({
        url: '/file-upload',  //server script to process data
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
            var str = '<li class="col-md-4">' +
                      '<div class="titleBar">__srcFileName__</div>'+
                      '<a href="http://dd885.b0.upaiyun.com/__upyunFileName__">' +
                      '<img src="http://dd885.b0.upaiyun.com/__upyunFileName__!preview" class="" alt="__srcFileName__">' +
                      '</a>' +
                      '<div class="deleteBar">删除</div>'
                      '</li>';//__srcFileName__
            str = str.replace(/__upyunFileName__/g,data.upyunFileName).replace(/__srcFileName__/,data.srcFileName);
            $('#imgPreview').append(str);
        });
});

$('#imgPreview').on('click','.deleteBar',function(e){
   $(this).parent().remove();
})

var insertCityOptions = function(selectTag){
    $.ajax(
        {
            url: '/file-upload',

        }
    )

}

//$('#modalForm').submit(function(e){
////    $('#doCreate').click(function(e){
//    e.preventDefault();
//    if($('#modalType').html()=='新增'){
//        url = "/ticketManagement/add";
//    }else{
//        url =  "/ticketManagement/update/"+$('#selectedId').val();
//    }
//    postData = $('#modalForm').serialize();
//    postData += "&gps=222,2222";
//    postData += "&image=dfafds:dasfdsa,dsfasdf:dfadsf";
//    postData += "&isEnable="+$('#isEnable').bootstrapSwitch('state').toString();
//    console.log(postData);
//    $.ajax({
//        type: "post",
//        url: url,
//        cache:false,
//        data:postData,
//    }).done(function(data, textStatus){
//            if(data.error!=0){
//                alert("保存错误："+data.errMsg);
//            }else{
//                $('#createModal').modal("toggle");
//            }
//        }).fail(function(){
//               alert("网络异常，请重试！");
//        }).always(function(){
//            $('#doCreate').button("reset");
//        });
//    return false;
//});



$('#doCreate').click(function(){

})