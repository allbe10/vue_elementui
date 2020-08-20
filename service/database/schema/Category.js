const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


const categorySchema = new Schema({
    id:{type:ObjectId},
    name:{unique:true,type:String},
    describe:{type:String},
    CreateAt : {type :Date,default :Date.now()}
})

mongoose.model('Category',categorySchema)