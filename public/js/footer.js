/**
 * Created by cloudbian on 14-3-14.
 */

$('.myTable').on('click','tr',function(){


    $(this).parent().children('tr.selected').removeClass('selected');
    $(this).addClass('selected');
});