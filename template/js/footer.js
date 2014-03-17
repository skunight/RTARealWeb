//nav control
$('.nav-container').on('click','ul > li > a',function(){
     $(this).next().toggleClass('hide');
});