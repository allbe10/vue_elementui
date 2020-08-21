const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const newSchema = Schema({
    id:ObjectId,
    adminName:{unique:true,type:String},
    password:{required:true,type:String},
    isSuper:{required:true,type:Boolean},
    phone:{type:String},
    email:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})

newSchema.methods = {
    //后台匹配密码的方法，_password为用户登录的密码，password为数据库存储的密码，对比两个密码
    comparePassword:(_password,password) => {
        return new Promise((resolve,reject) => {
            //bcrypt提供compare方法来把登录的密码和数据库加盐加密的密码进行对比
                if(_password == password) {
                    resolve('success')
                }
                else {
                    resolve('error')
                }         
        })
    }
}

mongoose.model('Admin',newSchema)