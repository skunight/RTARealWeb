

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



var a ={ "_id" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" : "江苏" }
db.PROVINCE.insert(a);
var a ={ "_id" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" : "浙江" }
db.PROVINCE.insert(a);
var a ={ "_id" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" : "安徽" }
db.PROVINCE.insert(a);
var a ={ "_id" : ObjectId("53217589af7d5b633f3361cf"), "isEnable" : true, "name" : "上海" }
db.PROVINCE.insert(a);


var a = {image:[],firstLetter:"n","pinyin":'ningbo',"provinceID" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'宁波',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"h","pinyin":'huzhou',"provinceID" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'湖州',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"a","pinyin":'anji',"provinceID" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'安吉',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"n","pinyin":'nanxun',"provinceID" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'南浔',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"h","pinyin":'haining',"provinceID" : ObjectId("53217588af7d5b633f3361cd"), "isEnable" : true, "name" :'海宁',order:1}
db.CITY.save();


var a = {image:[],firstLetter:"m","pinyin":'maanshan',"provinceID" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'马鞍山',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"c","pinyin":'chuzhou',"provinceID" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'滁州',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"x","pinyin":'xuancheng',"provinceID" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'宣城',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"n","pinyin":'ningguo',"provinceID" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'宁国',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"l","pinyin":'lingbi',"provinceID" : ObjectId("53217588af7d5b633f3361ce"), "isEnable" : true, "name" :'灵璧',order:1}
db.CITY.save();

var a = {image:[],firstLetter:"s","pinyin":'suzhou',"provinceID" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'苏州',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"k","pinyin":'kunshan',"provinceID" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'昆山',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"n","pinyin":'nantong',"provinceID" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'南通',order:2}
db.CITY.save();
var a = {image:[],firstLetter:"h","pinyin":'haimen',"provinceID" : ObjectId("53217588af7d5b633f3361cc"), "isEnable" : true, "name" :'海门',order:2}
db.CITY.save();

var a = {image:[],firstLetter:"s","pinyin":'shanghai',"provinceID" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '上海',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"s","pinyin":'songjiang',"provinceID" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '松江',order:1}
db.CITY.save();
var a = {image:[],firstLetter:"q","pinyin":'qingpu',"provinceID" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '青浦',order:2}
db.CITY.save();
var a = {image:[],firstLetter:"j","pinyin":'jinshan',"provinceID" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '金山',order:3}
db.CITY.save();
var a = {image:[],firstLetter:"c","pinyin":'chongming',"provinceID" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '崇明',order:4}
db.CITY.save();
var a = {image:[],firstLetter:"j","pinyin":'jiading',"provinceID" : ObjectId("53217589af7d5b633f3361cf"),"isEnable" : true, "name" : '嘉定',order:5}
db.CITY.save();









