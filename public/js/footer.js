/**
 * Created by cloudbian on 14-3-14.
 */

$('.myTable').on('click','tr',function(){
    var html = $(this).html();
    console.log(html);
});