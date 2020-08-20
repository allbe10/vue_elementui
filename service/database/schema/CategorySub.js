const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = mongoose.Types.ObjectId

const CategorySubSchema = new Schema({
    id:ObjectId,
    categoryId:{required:true,type:String},
    name:{unique:true,type:String},
    describe:{type:String},
    CreateAt : {type :Date,default :Date.now()}
})


mongoose.model('CategorySub',CategorySubSchema)