const Router = require('@koa/router')
const mongoose = require('mongoose')

const router = new Router()


//添加后台管理大类
router.post('/addmall',async(ctx) => {
    console.log(ctx.request.body)
    const Mall = mongoose.model('Mall')
    try {
        const newMall = new Mall(ctx.request.body)
        const result = await newMall.save()
        if(result) {
            ctx.body = {
                code:200,
                message:'后台管理大类添加成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'后台管理大类添加成功！'
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



//查询后台管理大类
router.get('/getmall',async(ctx) => {
    const Mall = mongoose.model('Mall')
    try {
        const result = await Mall.find().exec()
        if(result) {
            ctx.body = {
                code:200,
                message:result
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'没有后台管理大类！'
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


// 添加商品一级分类
router.post('/addcategory',async(ctx) => {
    const Category = mongoose.model('Category')
    let newCategory = new Category(ctx.request.body)
    try {
        const result = await newCategory.save()
        if(result) {
            ctx.body = {
                code:200,
                message:'商品类别添加成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'商品类别添加失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:'服务器出错！'
        }
    }
})

// 查询商品一级分类
router.post('/getcategory',async(ctx) => {
    const Category = mongoose.model('Category')
    try {
        const result = await Category.find({mallId:ctx.request.body.searchId}).exec()
        if(result) {
            ctx.body = {
                code:200,
                message:result
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'没有商品分类数据！'
            }
        }
    }
    catch(error) {
        ctx.body = {
            code:500,
            message:'数据库出现错误！'
        }
    }
})

//查询全部商品一级分类列表
router.get('/categorylist',async(ctx) => {
    const CategoryList = mongoose.model('Category')
    try {
        const result = await CategoryList.find().exec()
        if(result) {
            ctx.body = {
                code:200,
                message:result
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'没有商品一级分类数据！'
            }
        }
    }
    catch(error) {
        ctx.body = {
            code:500,
            message:'数据库出现错误！'
        }
    }
})

//删除一个一级分类字段
router.post('/deletecategory',async(ctx) => {
    const Category = mongoose.model('Category')
    try {
        const result = await Category.deleteOne({_id:ctx.request.body.id}).exec()
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

// 添加商品二级分类
router.post('/addcategorysub',async(ctx) => {
    console.log(ctx.request.body)
    const CategorySub = mongoose.model('CategorySub')
    let newCategorySub = new CategorySub(ctx.request.body)
    try {
        const result = await newCategorySub.save()
        if(result) {
            ctx.body = {
                code:200,
                message:'商品二级分类添加成功！'
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'商品二级分类添加失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:'服务器出错！'
        }
    }
})

//查询商品二级分类
router.post('/getcategorysub',async(ctx) => {
    console.log(ctx.request.body)
    const CategorySub = mongoose.model('CategorySub')
    try {
        const result = await CategorySub.find({categoryId:ctx.request.body.searchId}).exec()
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

//查询全部商品二级分类列表
router.get('/getcategorysublist',async(ctx) => {
    const CategorySub = mongoose.model('CategorySub')
    try {
        const result = await CategorySub.find().exec()
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

//删除一个二级分类字段
router.post('/deletecategorysub',async(ctx) => {
    const CategorySub = mongoose.model('CategorySub')
    try {
        const result = await CategorySub.deleteOne({_id:ctx.request.body.id}).exec()
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