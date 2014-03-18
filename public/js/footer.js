/**
 * Created by cloudbian on 14-3-14.
 */

$('.myTable').on('click','tr',function(){
    if($(this).hasClass('selected')){
        $(this).removeClass('selected');
        $('#selectedId').val("");
    }else{
        $(this).parent().children('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        console.log($(this).attr("id"));
        $('#selectedId').val($(this).attr("id"));
    }
});