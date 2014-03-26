/**
 * Created by cloudbian on 14-3-19.
 */
//search list
$('#query').click(function(event){
    $('#query').button("loading");
    console.log($('#srhForm').serialize());
    console.log($('#sDate').val());
    console.log($('#eDate').val());
//    $.ajax({
//        type: "post",
//        url: "/providerMember/list",
//        cache:false,
////            dataType:"json",
//        data:$('#srhForm').serialize(),
//        success: function(data, textStatus){
//            if(data.error!==0){
//                console.log(data);
//                alert("查询出错！");
//            }else{
//                var html = new EJS({url:"./template/temp_providerMember.ejs"}).render(data);
//                $('#tblcontent').html(html);
//                refreshPaginator(data.data.currentPage,data.data.totalPage);
//            }
//        },
//        complete: function(XMLHttpRequest, textStatus){
//            //HideLoading();
            $('#query').button("reset");
//        },
//        error: function(){
//            //请求出错处理
//            alert("网络异常，请重试！");
//        }
//    });
});

//autocomplete for product name
$('#searchProduct').autocomplete({
    source:function(req,res){
        $.ajax({
            type: "get",
            url: "/getProductNames/hotel/",
            cache:false,
//            dataType:"json",
            data:{city:$('#searchCity').val(),name:req.term},
            success: function(data, textStatus){
               res(data);
            },
            complete: function(XMLHttpRequest, textStatus){
                //HideLoading();
            },
            error: function(){
                //请求出错处理
                alert("网络异常，请重试！");
            }
        });
    },
    max:10,
    minLength:2,
    width:$(this).width()
});

//auto print value for addHotelPriceModal
$('#cost').keyup(function(){
    if(""!==$('#cost').val().trim()){
        $('#costWeekend').val($('#cost').val());
    }
});

$('#price').keyup(function(){
    if(""!==$('#price').val().trim()){
        $('#priceWeekend').val($('#price').val());
        $('#packagePrice').val($('#price').val());
        $('#packagePriceWeekend').val($('#price').val());
        $('#marketPrice').val($('#price').val());
        $('#marketPriceWeekend').val($('#price').val());

    }
});

$('#packagePrice').keyup(function(){
    if(""!==$('#packagePrice').val().trim()){
        $('#packagePriceWeekend').val($('#packagePrice').val());
    }
});

$('#marketPrice').keyup(function(){
    if(""!==$('#marketPrice').val().trim()){
        $('#marketPriceWeekend').val($('#marketPrice').val());
    }
});

$('#inventory').keyup(function(){
    if(""!==$('#inventory').val().trim()){
        $('#inventoryWeekend').val($('#inventory').val());
    }
});

//isShow inventoryWeekend
$('#inventoryType').change(function(){
    if("0"===$('#inventoryType').val()){
        $('#inventoryWeekend').show();
    }else{
        $('#inventoryWeekend').hide();
    }
});

//save or update provider
$('#pMbrForm').submit(function(event){
    var url;
    $('#savePMember').button("loading");
    if("save"===$('#tabActive').val()){
        url = "/providerMember/add";
        $('#passwd').val(faultylabs.MD5($('#passwd').val()).toLowerCase());
    }else{
        url =  "/providerMember/update/"+$('#selectedId').val();
    }
    $.ajax({
        type: "post",
        url: url,
        cache:false,
//            dataType:"json",
        data:$('#pMbrForm').serialize(),
        success: function(data, textStatus){
            if(data.error!==0){
                alert("保存供应商错误："+data.errMsg);
            }else{
                refreshTable(1);
            }
        },
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
            $('#savePMember').button("reset");
            $('#createProviderMemberModal').modal("toggle");
        },
        error: function(){
            //请求出错处理
            alert("网络异常，请重试！");
        }
    });
    event.preventDefault();
});

//show create dailog
$('#showAdd').click(function(e){
    $('#addForm')[0].reset();
    if("0"===$('#inventoryType').val()){
        $('#inventoryWeekend').show();
    }
});

//refresh paginator
function refreshPaginator(currentPage,totalPage){
    var opt = {
        //paginator
        bootstrapMajorVersion:3,
        currentPage:currentPage,
        totalPages:totalPage,
        size:"normal",
        alignment:"left",
        onPageClicked:function(event, originalEvent, type, page){
            refreshTable(page);
        }
    };
    $('#pageDiv').bootstrapPaginator(opt);
}

//refresh table and paginator
function refreshTable(currentPage){
    //refresh table
    $.ajax({
        type: "post",
        url: "/providerMember/list",
        cache:false,
//            dataType:"json",
        data:{current:currentPage},
        success: function(data, textStatus){
            var html = new EJS({url:"./template/temp_providerMember.ejs"}).render(data);
            $('#tblcontent').html(html);
            refreshPaginator(data.currentPage,data.totalPage);
        },
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(e){
            //请求出错处理
            alert("网络异常，请重试！");
        }
    });
}

//format date to yyyy-MM-dd
function formatDate(time){
    return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
}