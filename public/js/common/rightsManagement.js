/**
 * Created by wucho on 14-4-2.
 */

$(document).ready(function(){
    $('#searchProvider').change(function(){
        $.ajax({
             url:'/listMemberByProvider/'+$('#searchProvider').val()
            ,method:'GET'
        }).done(function(data){
                console.log(data);
                var optionStr = '<option value="__memberID__">__memberName__</option>';
                var options='';
                $.each(data.data,function(index,data){
                    options+=optionStr.replace(/__memberName__/,data.name).replace(/__memberID__/,data._id);
                });
                $('#searchMember').html(options);
            });
    });
});
