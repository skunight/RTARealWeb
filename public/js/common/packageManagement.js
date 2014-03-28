var images=[];
var productType = 'package';

//读取relateProductInfo信息
var readRelateProductInfo = function(){
    var relatedProductID = [];
    $('#relateProductInfo .subProductInfo').each(function(index,data){
        var productID   = $(this).find('.productIDInfo').attr('id');
        var day = $(this).find('.productDayInfo').attr('productDay');
        var qty = $(this).find('.productQtyInfo').attr('productQTY');
        relatedProductID.push( {'product' : productID , 'day' : day , 'qty' : qty } );
    });
    return JSON.stringify(relatedProductID);
};

//刷新产品信息
var refreshProductInfo = function(){
    $('#content').val('');
    $('#intro').val('');
    $('#bookRule').val('');
    $('#useRule').val('');
    $('#cancelRule').val('');
    $('#relateProductInfo .subProductInfo').each(function(index,data){
        var productID   = $(this).find('.productIDInfo').attr('id');
        var productType = $(this).find('.productIDInfo').attr('productType');
        console.log(productID,productType);
        $.ajax({
            method:'GET'
            ,url:'/__PRODUCTTYPE__Management/detail/__ID__'.replace(/__PRODUCTTYPE__/,productType).replace(/__ID__/,productID)
            ,async:false
        }).done(function(data){
                //insert Data
                $('#content').val($('#content').val()+data.data.content+"\n");
                $('#intro').val($('#content').val()+data.data.intro+"\n");
//                    if(undefined!==data.data.city){
//                        $("#city option[value='"+data.data.city._id+"']").attr("selected",true);
//                    }
                $('#bookRule').val($('#content').val()+data.data.bookRule+"\n");
                $('#useRule').val($('#content').val()+data.data.useRule+"\n");
                $('#cancelRule').val($('#content').val()+data.data.cancelRule+"\n");
            });
    });
};

//刷新关联产品信息
var resetSubProductInfo = function(){
    $('#subProductName').val('');
    $('#subProductQty').val('');
    $('#subProductName').data('subProductID','');
};

//重置打包产品modal中的信息
var resetpackageProductInfo = function(){
    resetSubProductInfo();
    $('#relateProductInfo').empty();
    $('#name').val("");
    $('#content').val("");
    $('#intro').val("");
    $('#bookRule').val("");
    $('#useRule').val("");
    $('#cancelRule').val("");
    $('#isEnable').bootstrapSwitch('state',true);
};

//var addImage = function(imgObj){
//    var intro = imgObj.intro;
//    var url = imgObj.url;
//    var str = '<li class="col-md-4">' +
//        '<div class="titleBar">__srcFileName__</div>'+
//        '<a id="__upyunFileName__" href="http://dd885.b0.upaiyun.com/__upyunFileName__">' +
//        '<img src="http://dd885.b0.upaiyun.com/__upyunFileName__!preview" class="" alt="__srcFileName__">' +
//        '</a>' +
//        '<div class="deleteBar">删除</div>'
//    '</li>';//__srcFileName__
//    str = str.replace(/__upyunFileName__/g,url).replace(/__srcFileName__/,intro);
//    $('#imgPreview').append(str);
//};

$('#showCreate').click(function(){
    $('#modalType').html('新增');
    resetSubProductInfo();
    resetpackageProductInfo();
});

//编辑
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
            url: "/packageManagement/detail/"+_id,
            cache:false
        }).done(function(data, textStatus){
                if(data.error===0){
                    //hide some element when edit
                    resetpackageProductInfo();
                    $('.hideWhenEdit').css('display','none');
                    //insert Data
                    $('#name').val(data.data.name);
                    $('#content').val(data.data.content);
                    $('#intro').val(data.data.intro);
                    data.data.relatedProductID.forEach(function(d){
                        //addRelatedProductInfo(productType,subProductName,subProductID,subProductQty,subProductDay,true);
                        addRelatedProductInfo("", d.product.name, d.product._id, d.qty, d.day,false);
                    })
                    if(undefined!==data.data.city){
                        $("#city option[value='"+data.data.city._id+"']").attr("selected",true);
                    }
                    $('#bookRule').val(data.data.bookRule);
                    $('#useRule').val(data.data.useRule);
                    $('#cancelRule').val(data.data.cancelRule);
//                    $('#transportation').val(data.data.transportation);
//                    $('#operatorName').val(data.data.operatorName);
                    $('#isEnable').bootstrapSwitch('state',data.data.isEnable);
//                    把数据填充完毕以后再显示详情
                    $('#createModal').modal("show");
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



////图片上传
//$('#doUpload').click(function(e){
//    e.preventDefault();
//    var formData = new FormData($('#fileuploadform')[0]);
//    var picName  = $('#imgintro').val();
//    $.ajax({
//        url: '/file-upload',  //server script to process data
//        type: 'POST',
//        data: formData,
//        cache: false,
//        contentType: false,
//        processData: false
//    }).done(function(data){
//            if(picName==""){
//                //如果用户没有填写图片名称，则默认使用上传的图片名称
//                picName=data.srcFileName;
//                addImage({intro:picName,url:data.upyunFileName});
//            }
//        });
//});

//$('#imgPreview').on('click','.deleteBar',function(e){
//   $(this).parent().remove();
//});
////读取图片列表
//var readImage = function(images){
//    var imageStr = [];
//    $('#imgPreview > li').each(function(){
//        var imgName = $(this).find('.titleBar').html();
//        var imgId   = $(this).find('a').attr('id');
//        imgName = imgName.replace(/:/,'').replace(/,/,'');
//        imgId   = imgId.replace(/:/,'').replace(/,/,'');
//        imageStr.push(imgId+':'+imgName);
//    });
//    return imageStr==[]?"":imageStr.join(',');
//
//};

//$('#doCreate').click(function(e){
//    console.log(readImage());
//});

$('#doCreate').click(function(e){
    var postData={};
    postData.name     = $('#name').val();
    postData.content  = $('#content').val();
    postData.intro       = $('#intro').val();
//    postData.image       = readImage();
    postData.relatedProductID = readRelateProductInfo();
    postData.image="";
    postData.city        = $('#city option:selected').val();
    postData.addr        =$('#addr').val();
    postData.gps         =$('#lat').val()+','+$('#lon').val();
    postData.level       =$('#level').val();
    postData.openTime    =$('#openTime').val();
    postData.bookRule    =$('#bookRule').val();
    postData.useRule     =$('#useRule').val();
    postData.cancelRule  =$('#cancelRule').val();
    postData.transportation =$('#transportation').val();
    postData.effectDate      =$('#effectDate').val();
    postData.expiryDate      =$('#expiryDate').val();
    postData.isEnable           = $('#isEnable').bootstrapSwitch('state').toString();
    postData.contactName        =$('#contactName').val();
    postData.tel                =$('#tel').val();
    postData.fax                =$('#fax').val();
    postData.subType      = $('#subType').val();
    postData.operator     = '50fe5af792ed2bfb07d20d37';//$('#operatorName').val();
    console.log(JSON.stringify(postData));
    if($('#modalType').html()=='新增'){
        url = "/packageManagement/add";
    }else{
        url =  "/packageManagement/update/"+$('#selectedId').val();
    }
    console.log(url);
    $.ajax({
        type: "post",
        url: url,
        cache:false,
        data:postData
    }).done(function(data, textStatus){
            if(data.error!=0){
                alert("错误："+ data.errorMsg);
            }else{
                location.reload();
            }
        }).fail(function(){
               alert("网络异常，请重试！");
               $('#doCreate').button("reset");
        });
    return false;
});

//查询条件中的产品名称搜索
$('#searchName').autocomplete({
    source:function(req,res){
        $.ajax({
            method:'GET',
            url:'/getProductNames/'+productType,
            data:{city:$('#searchCity').val(),
                name:req.term}
        }).done(function(data){
                res(data);
            });
    }
    ,minLength:0
    ,select:function(event,ui){
        event.preventDefault();
        $('#searchName').val(ui.item.label);
        $('#searchName').data( "productID", ui.item.value );
    }
}).focus(function() {
        $(this).autocomplete("search", "");
    });

//搜索条件中换城市的时候清空产品名称
$('#searchCity').change(function(){
    //清空产品名称的框
    $('#searchName').val('');
    //情况产品名称框框中隐藏的productID
    $('#searchName').data( "productID", '' );
});

//选择产品的autocomplete逻辑
$('#subProductName').autocomplete({
    source:function(req,res){
        $.ajax({
            method:'GET',
            url:'/getProductNames/'+$('#subProductType').val(),
            data:{city:$('#subProductCity').val(),
                name:req.term}
        }).done(function(data){
                res(data);
            });
    }
    ,minLength:0
    ,appendTo:'#subProductPreSelect'
    ,select:function(event,ui){
        event.preventDefault();
        $('#subProductName').val(ui.item.label);
        $('#subProductName').data( "subProductID", ui.item.value );
    }
}).focus(function() {
        $(this).autocomplete("search", "");
    });


//在添加关联产品的选择条件改变的时候清空产品名称和产品数量
$('#subProductCity , #subProductType , #subProductName').change(function(){
    resetSubProductInfo();
});


//传入关联产品信息后，填充关联产品信息的表格
var addRelatedProductInfo = function(productType,subProductName,subProductID,subProductQty,subProductDay,isEdit){
    //每点击一次做一次信息填充

    //把以上的基本信息填充到显示表格中 __DAY__ __PRODUCTTYPE__  __PRODUCTID__  __QTY__  __PRODUCTNAME__
    var str =  '<div class="subProductInfo form-group">'+
        '<label class="col-md-2 control-label col-md-offset-2 productDayInfo" productDay="__DAY__">第__DAY__天</label>' +
        '<label class="col-md-2 control-label productIDInfo" id="__PRODUCTID__" productType="__PRODUCTTYPE__">__PRODUCTNAME__</label>' +
        '<label class="col-md-2 control-label productQtyInfo" productQTY="__QTY__">__QTY__</label>' +
        '__DELETEBUTTON__'
    '</div>';
    var delButtonStr =  '<div class="col-md-1">' +
        '<button class="btn btn-danger subProductDel">删除</button>' +
        '</div>';

    str=str.replace(/__DAY__/g,subProductDay)
        .replace(/__PRODUCTNAME__/,subProductName)
        .replace(/__QTY__/g,subProductQty)
        .replace(/__PRODUCTID__/,subProductID)
        .replace(/__PRODUCTTYPE__/,productType);
    if(isEdit == true){
        str = str.replace(/__DELETEBUTTON__/,delButtonStr);
    }else{
        str = str.replace(/__DELETEBUTTON__/,"");
    }
    $('#relateProductInfo').append(str);
}


//确认添加关联产品的逻辑
$('#addProduct').click(function(){
    var productType    = $('#subProductType').val();
    var subProductName = $('#subProductName').val();
    var subProductID   = $('#subProductName').data('subProductID');
    var subProductQty  = $('#subProductQty').val();
    var subProductDay  = $('#subProductDay').val();
    if( _.isEmpty(subProductID) || _.isEmpty(subProductQty) ){
        alert("请填写完整!");
        return;
    }
    addRelatedProductInfo(productType,subProductName,subProductID,subProductQty,subProductDay,true);
    refreshProductInfo();
});

//点击删除关联产品的按钮的动作
$('#relateProductInfo').on('click','.subProductDel',function(){
   $(this).parent().parent().remove();
   refreshProductInfo();
});

//$('ul').on('click','a',function(e){
//    e.preventDefault();
//    console.log('a');
//});

//$('#query').click(function(e){
//    e.preventDefault();
//
//});
