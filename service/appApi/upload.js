const Router = require('@koa/router')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')


const router = new Router()

router.post('/upload',async(ctx) => {
    const file = ctx.request.files.file
    console.log(file)
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    var uploadPath = path.join(__dirname, '../upload/images') + `/${newFilename}`;
    //创建可写流
    const upStream = fs.createWriteStream(uploadPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //返回保存的路径
    ctx.body = {
        code:200,
        message:{url: 'http://' + ctx.headers.host + '/images/' + newFilename}
    }
})


module.exports = router