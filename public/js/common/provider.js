/**
 * Created by cloudbian on 14-3-14.
 */
//save provider
    $('#createProvider').click(function(e){
        console.log($('#providerForm').serialize());
        $(this).button("loading");
        $.ajax({
            type: "post",
            url: "/provider/add",
            cache:false,
//            dataType:"json",
            data:$('#providerForm').serialize(),
            success: function(data, textStatus){

            },
            complete: function(XMLHttpRequest, textStatus){
                //HideLoading();
                $('#createProvider').button("reset");
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
