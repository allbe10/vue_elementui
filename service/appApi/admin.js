const Router = require('@koa/router')
const mongoose = require('mongoose')

const router = new Router();

//管理员注册接口
router.post('/register',async(ctx) => {
    const Admin = mongoose.model('Admin')
    try {
        const newAdmin = new Admin(ctx.request.body.data)
        const res = await newAdmin.save()
        if(res) {
            ctx.body = {
                code:200,
                message:'管理员添加成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'管理员添加失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})

//管理员个人信息接口
router.post('/getadmin',async(ctx) => {
    const Admin = mongoose.model('Admin')
    try {
        const res = await Admin.findOne({_id:ctx.request.body.id}).exec()
        if(res) {
            ctx.body = {
                code:200,
                message:res
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'管理员信息查看失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})

//管理员登录接口
router.post('/login',async(ctx) => {
    let adminName = ctx.request.body.adminName
    let password = ctx.request.body.password
    let time = (new Date()).getTime()
    let settime = time+8*60*60*1000
    const Admin = mongoose.model('Admin')
    try {
        const resuserName = await Admin.findOne({adminName:adminName}).exec()
        if(resuserName) {
            let newAdmin = new Admin()
            const respassWord = await newAdmin.comparePassword(password,resuserName.password)
            console.log(respassWord)
            if(respassWord == 'success') {
                const lastlogintime = new Date(settime)
                const restime = await Admin.updateOne({_id:resuserName._id},{lastLoginAt:lastlogintime})
                if(restime) {
                    ctx.body = {
                        code:200,
                        message:'用户登录成功！',
                        token:time + '+' + resuserName._id
                    }
                }
                else {
                    ctx.body = {
                        code:500,
                        message:'用户登录失败！',  
                    }
                }
            }
            else {
                ctx.body = {
                    code:500,
                    message:'用户密码错误！'
                }
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'用户名不存在！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})

//管理员更新信息接口
router.post('/updata',async(ctx) => {
    const Admin = mongoose.model('Admin')
    const data = ctx.request.body.data
    const id = ctx.request.body.id
    let res = ''
    try {
        const dataLength = Object.keys(data)
        res = await Admin.findByIdAndUpdate({_id:id},data,{new:true})
        if(res) {
            ctx.body = {
                code:200,
                message:'信息修改成功'
            }
        }
        else {
            ctx.body = {
                code:200,
                message:'信息修改失败'
            }
        }
    }
    catch(error) {
        console.log(error)
        console.log('服务器出错')
    }
})

module.exports=router;