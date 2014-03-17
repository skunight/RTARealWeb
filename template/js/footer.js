//nav control
$('.nav-container').on('click','ul > li > a',function(){
//     $(this).parent().children('ul').addClass('hide');
     $(this).next().toggleClass('hide');
});