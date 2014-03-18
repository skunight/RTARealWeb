/**
 * Created by cloudbian on 14-3-14.
 */
//save provider
    $('#createProvider').click(function(e){
        $(this).button("loading");
        $.ajax({
            type: "post",
            url: "/provider/add",
            cache:false,
//            dataType:"json",
            data:$('#providerForm').serialize(),
            success: function(data, textStatus){
                if(data.error!==0){
                    alert("保存供应商错误："+data.errMsg);
                }else{
                    refreshTable(1);
                }
            },
            complete: function(XMLHttpRequest, textStatus){
                //HideLoading();
                $('#createProvider').button("reset");
                $('#createProviderModal').modal("toggle");
            },
            error: function(){
                //请求出错处理

            }
        });
        return false;
    });

//show create dailog
$('#showCreate').click(function(e){
    $('#modalTilte').val("新建供应商");
    $('#providerForm')[0].reset();
});

//show edit dailog
$('#showEdit').click(function(e){
    $('#modalTilte').val("编辑供应商");
    $(this).button("loading");
    $('#createProviderModal').modal("hide");
    $.ajax({
        type: "post",
        url: "/provider/update",
        cache:false,
//            dataType:"json",
        data:"abc",
        success: function(data, textStatus){
            $('#name').val(data.name);
            $('#contactName').val(data.contactName);
            $('#contactPhone').val(data.contactPhone);
            $('#proCode').val(data.proCode);
            $('#balanceType').val(data.balanceType);
            $('#returnType').val(data.returnType);
            $('#remark').val(data.remark);
            $('#isEnable').val(data.isEnable);
            $('#operatorName').val(data.operatorName);
        },
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
            $('#createProviderModal').modal("show");
            $('#showEdit').button("reset");
        },
        error: function(){
            //请求出错处理

        }
    });
});


//select table row
function selectRow(row){
    console.log(row);
}

//refresh paginator
function refreshPaginator(currentPage,totalPage){
    var opt = {
        //paginator
        bootstrapMajorVersion:3,
        useBootstrapTooltip:true,
        currentPage:currentPage,
        totalPages:totalPage,
        size:"normal",
        alignment:"left",
        pageUrl : function(type,page,current){
            return  "/provider?currentPage="+current;
        }
    };
    $('#pageDiv').bootstrapPaginator(opt);
}
//refresh table and paginator
function refreshTable(currentPage){
    //refresh table
    $.ajax({
        type: "post",
        url: "/provider/list",
        cache:false,
//            dataType:"json",
        current:currentPage,
        success: function(data, textStatus){
            console.log(data);
            var html = new EJS({url:"./template/temp_provider.ejs"}).render(data);
            $('#tblcontent').html(html);
            refreshPaginator(data.currentPage,data.totalPage);
        },
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(e){
            //请求出错处理
            alert(e.message);
        }
    });
}