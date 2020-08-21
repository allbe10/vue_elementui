const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const bodyBody = require('koa-body')
const serve = require('koa-static')
const cors = require('koa-cors')
const {connect , initSchemas} = require('./database/init.js')
const Router = require('@koa/router')
let user = require('./appApi/user.js')
let upload = require('./appApi/upload.js')
let goods = require('./appApi/goods.js')
let category = require('./appApi/category.js')
let news = require('./appApi/news.js')
let admin = require('./appApi/admin.js')

//立即执行函数
;(async() =>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName:'jspang134',password:'1234567'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
})()


app.use(cors());   //跨域
//打通前后端通信
app.use(bodyBody(
    {
        multipart:true,
        formidable:{
          maxFileSize:200*1024*1024    //设置上传文件的大小，默认2M
        }
      }
));   //可以以ctx.request.body获取前端发送过来的数据
app.use(serve(__dirname + '/upload'))

//添加路由中间件拦截器，如果token过期，不能得到服务器的响应
app.use(async(ctx,next) => {
    if(/^\/user/.test(ctx.request.path)) {
        if(ctx.request.path == '/user/login' || ctx.request.headers.token || ctx.request.path == '/user/register') {
            if(ctx.request.headers.token) {
                console.log(ctx.request.headers.token)
                const time = ctx.request.headers.token.slice(3)
                const timeNow = ((new Date())).getTime()
                const newTime = timeNow - time
                if(newTime>8640000) {
                    console.log('不通过1')
                    ctx.body = {
                        code:401,
                        message:'账号过期,请重新登录！'
                    }
                    ctx.status=401 //token过期了，需要登录
                }else {
                    console.log('通过1')
                    await next()
                }
            }else {
                console.log('通过2')
                await next()
            }   
        }
        else {
            console.log('不通过2')
            ctx.body = {
                code:401,
                message:'账号过期,请重新登录！'
            }
            ctx.status=401 //token过期了，需要登录
        }
    }
    else {
        await next()
    }
})

//装载所有的子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/test',upload.routes())
router.use('/goods',goods.routes())
router.use('/category',category.routes())
router.use('/news',news.routes())
router.use('/admin',admin.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


app.use(async(ctx) => {
    ctx.body ='成功！'
})

app.listen(3000,() => {
    console.log('后端服务器启动成功！')
})