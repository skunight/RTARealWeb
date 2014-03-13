

//密码是md5加密 nicai
var a ={
    _id:ObjectId("5320ff9b6532aa00951ff5e0")
    ,mobile:'18616365242'
    ,name:'管理员'
    ,passwd:'529faef522e1b7f8ce1387406caf9394'
    ,email:'admin@justpayyou.com'
    ,tel:''
    ,gender:'男'
    ,birthYear:'1982'
    ,favouriteCity:''
    ,lastDestCity:''
    ,lisencePlate:''
    ,intentCity:''
    ,idCard:''
    ,postAddr:''
    ,signupDate:1394671086295
    ,providerID:ObjectId("5320ffb06532aa00951ff5e1")
    ,isEnable:true
    ,operatorID:ObjectId("5320ff9b6532aa00951ff5e0")
}
db.MEMBER.save(a)


var a={
    _id:ObjectId("5320ffb06532aa00951ff5e1")
    ,name:'路骋网'
    ,contactName:'管理员'
    ,contactEmail:'admin@justpayyou.com'
    ,contactPhone:'18616365242'
    ,proCode:'RTA'
    ,remark:''
    ,isEnable:true
    ,type:2
    ,balanceType:''
    ,returnType:''
    ,createTime:1394671086295
    ,updateTime:1394671086295
    ,operatorID:ObjectId("5320ff9b6532aa00951ff5e0")
}
db.ENT.save(a)










var a= {code:'providerManagement',name:'供应商管理',cat:'供应商',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:1}
db.PRO.MODULE.save(a);

var a={code:'providerMemberManagement',name:'供应商账号管理',cat:'供应商',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:2}
db.PRO.MODULE.save(a);

var a={code:'ticketManagement',name:'门票产品录入',cat:'产品',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:10}
db.PRO.MODULE.save(a);
var a={code:'packageManagement',name:'打包产品录入',cat:'产品',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:11}
db.PRO.MODULE.save(a);


var a={code:'hotelPriceInput',name:'酒店价格录入',cat:'价格',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:20}
db.PRO.MODULE.save(a);
var a={code:'voturePriceInput',name:'优惠券价格录入',cat:'价格',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:21}
db.PRO.MODULE.save(a);
var a={code:'ticketPriceInput',name:'门票价格录入',cat:'价格',isEnable:true,createTime:1394671086295,updateTime:1394671086295,operatorID:ObjectId('5320ff9b6532aa00951ff5e0'),order:22}
db.PRO.MODULE.save(a);






