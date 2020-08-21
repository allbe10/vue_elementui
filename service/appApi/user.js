const Router = require('@koa/router')
const mongoose = require('mongoose')

const router = new Router();

//用户登录接口
router.post('/login',async(ctx) => {
    console.log(ctx.request.body)
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    const time = (new Date()).getTime()
    const User = mongoose.model('User')
    try {
        const resuserName = await User.findOne({username:username}).exec()
        if(resuserName) {
            console.log('11111111111')
            let newUser = new User()
            const respassWord = await newUser.comparePassword(password,resuserName.password)
            console.log(respassWord)
            if(respassWord == 'success') {
                ctx.body = {
                    code:200,
                    message:'用户登录成功！',
                    token:'lsc'+time
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


//用户注册接口
router.post('/register',async(ctx) => {
    console.log(ctx.request.body);
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    try {
        const result = await newUser.save()
        if(result) {
            console.log(result)
            ctx.body = {
                code:200,
                message:'用户注册成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'服务器出现问题！'
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


//用户注销接口
router.get('/logout',async(ctx) => {
        ctx.body = {
            code:-1,
            message:'你已退出登录！'
        }   
})

// 用户数据导入
router.post('/adduser',async(ctx) => {
    console.log(ctx.request.body.data)
    const User = mongoose.model('User')
    try {
        const result = await User.insertMany(ctx.request.body.data)
        if(result) {
            console.log(result)
            ctx.body = {
                code:200,
                message:'用户注册成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'服务器出现问题！'
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

// 用户数据获取
router.get('/getuserList',async(ctx) => {
    const User = mongoose.model('User')
    try {
        const result = await User.find().exec()
        if(result) {
            console.log(result)
            ctx.body = {
                code:200,
                message:result
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'服务器出现问题！'
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


// 删除一个用户
router.post('/deleteuser',async(ctx) => {
    console.log(ctx.request.body)
    const User = mongoose.model('User')
    try {
        const result = await User.deleteOne({_id:ctx.request.body.userId}).exec()
        if(result) {
            console.log(result)
            ctx.body = {
                code:200,
                message:'用户删除成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'服务器出现问题！'
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
module.exports=router;