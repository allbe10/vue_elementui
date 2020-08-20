const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = mongoose.Types.ObjectId

const newGoods = new Schema({
    id:ObjectId,
    categorysubId:{required:true,type:String},
    goodsName:{required:true,type:String},
    goodsPrice:{required:true,type:Number},
    isHot:{required:true,type:Boolean},
    isSales:{required:true,type:Boolean},
    salesPrice:{type:Number,default:0},
    salesTime:{type:String,default:''},
    goodsPicture:{required:true,type:String},
    goodsDescription:{required:true,type:String},
    createAt:{type:Date,default:Date.now()}
})

mongoose.model('Goods',newGoods)