const Router = require('@koa/router')
const mongoose = require('mongoose')

const router = new Router()

router.get('/',async(ctx) => {
    ctx.body = {
        code:200,
        message:'没错'
    }
})


//添加商品接口
router.post('/addgoods',async(ctx) => {
    console.log(ctx.request.body)
    try {
        const Goods = mongoose.model('Goods')
        const newGoods = new Goods(ctx.request.body)
        const result = await newGoods.save()
        if(result) {
            ctx.body = {
                code:200,
                message:'商品添加成功！'
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
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})


//后台查询二级分类商品接口
router.post('/getgoods',async(ctx) => {
    console.log(ctx.request.body)
    try {
        const Goods = mongoose.model('Goods')
        const result = await Goods.find({}).exec()
        if(result) {
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
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})


//后台查询全部商品接口
router.get('/getgoodslist',async(ctx) => {
    try {
        const Goods = mongoose.model('Goods')
        const result = await Goods.find().exec()
        if(result) {
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
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})

//删除某一商品
router.post('/deletegoods',async(ctx) => {
    const Goods = mongoose.model('Goods')
    try {
        const result = await Goods.deleteOne({_id:ctx.request.body.id}).exec()
        if(result) {
            ctx.body = {
                code:200,
                message:result
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'商品二级分类查询失败！'
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


module.exports = router
