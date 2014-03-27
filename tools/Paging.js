exports.getPageInfo = function(query,totalPage){

    var requestPage = query.current  > 0 ? parseInt(query.current)  : 1;
    var isPre       = query.isPre     > 0 ? parseInt(query.isPre)     : 0;
    var isNext      = query.isNext    > 0 ? parseInt(query.isNext)    : 0;
    var startPage   = query.startPage > 0 ? parseInt(query.startPage) : 1;
    var totalPage=parseInt(totalPage);
    console.log('Paging Step1',new Date(),startPage);
    var pageInfo=[];
    //如果传过来的是”下一页“，则开始页就从现在的开始页的下一页开始
    startPage =startPage+isNext-isPre;
    for(var i=0;i<=4;i++){
        pageInfo[i]={};
        pageInfo[i].page  = startPage+i;
        //如果页数大于总页数,则标为disable
        if(startPage+i>totalPage){
            pageInfo[i].class = "disabled";
        }
        //如果页数等于当前页，则标为active
        if(startPage+i == requestPage){
            pageInfo[i].class = "active";
        }
    }
    //前一页
    pageInfo[20] = {page:requestPage - 1,class:requestPage <= 1 ? 'disabled':''};
    //下一页
    pageInfo[21] = {page:requestPage + 1,class:requestPage + 1 > totalPage ? 'disabled':''};
    //末尾页
    pageInfo[22] = {totalPage:totalPage+1};
    return pageInfo;
}