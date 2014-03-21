/**
 * Created by cloudbian on 14-3-19.
 */
//search list
$('#srhForm').submit(function(event){
    $('#query').button("loading");
    $.ajax({
        type: "post",
        url: "/providerMember/list",
        cache:false,
//            dataType:"json",
        data:$('#srhForm').serialize(),
        success: function(data, textStatus){
            if(data.error!==0){
                console.log(data);
                alert("查询出错！");
            }else{
                var html = new EJS({url:"./template/temp_providerMember.ejs"}).render(data);
                $('#tblcontent').html(html);
                refreshPaginator(data.data.currentPage,data.data.totalPage);
            }
        },
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
            $('#query').button("reset");
        },
        error: function(){
            //请求出错处理
            alert("网络异常，请重试！");
        }
    });
    event.preventDefault();
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