<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-form-item label="选择商品二级分类">
                <el-select v-model="categorysubId" :placeholder="firstName">
                <el-option
                    v-for="item in categorysub"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="form.goodsName" placeholder="请输入商品名称" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice">
                <el-input v-model.number="form.goodsPrice" placeholder="请输入商品价格" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="goodsDescription">
                <el-input v-model="form.goodsDescription" placeholder="请输入商品描述" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="是否为热门商品">
                <el-select v-model="value" placeholder="普通商品">
                    <el-option
                        v-for="item in isHot"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为促销商品">
                <el-select v-model="isSalesvalue" placeholder="普通商品">
                    <el-option
                        v-for="item in isSales"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="促销商品活动时间" v-show="isOpen">
                <el-date-picker
                    v-model="salesTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品促销价格" prop="salesPrice" v-show="isOpen">
                <el-input v-model.number="form.salesPrice" placeholder="请输入商品促销价格" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="商品图片">
                <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :http-request="addpicture">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">添加</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
             </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
    data() {
        var validateSales = (rule, value, callback) => {
            if(this.isOpen == false) {
                callback()
            }
            else {
                if (!value) {
                    return callback(new Error('商品促销价格不能为空！'));
                }
                else {
                    let objRegExp= /^\d+\.\d+$/;
                    if(objRegExp.test(value)) {
                        callback()
                    }
                    else {
                        let reg=/^[0-9]/;   /*定义验证表达式*/
                        if(reg.test(value)) {
                            callback()
                        }
                        else {
                            return callback(new Error('请输入正确的商品促销价格！'));
                        }
                    }
                }
            }
        };
        return {
            form : {
                goodsName:'',
                goodsPrice:'',
                goodsDescription:'',
                salesPrice:'',
            },
            rules : {
                goodsName :[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goodsPrice :[
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                    { type:'number', message: '请输入正确的商品价格', trigger: 'blur'}
                ],
                goodsDescription :[
                    { required: true, message: '请输入商品描述', trigger: 'blur' },
                ],
                salesPrice :[
                    { validator: validateSales, trigger: 'blur' }
                ]
            },
            isHot: [{
                value: 'false',
                label: '普通商品'
                }, 
                {
                value: 'true',
                label: '热门商品'
            },],
            isSales: [{
                value: 'false',
                label: '普通商品'
                }, 
                {
                value: 'true',
                label: '促销商品'
            },],
            value:'',
            isSalesvalue:'',
            salesTime:'',
            imageUrl: '',
            isOpen:'',
            file:'',
            pictureUrl:'',
            categorysubId:'',
            goodsData:{},
            categorysub:[],
            firstName:'',
        }
    },
    created() {
        this.startGoods()
    },
    methods : {
        submitForm(form) {
            console.log('你点击了提交按钮')
            this.$refs[form].validate(async(valid) => {
                if(!valid) return;
                if(this.pictureUrl == '') {
                    console.log('必须上传商品图片！')
                }
                else {
                    try {
                        if(this.isSalesvalue == 'false') {
                            this.goodsData = {
                                categorysubId:this.categorysubId,
                                goodsName:this.form.goodsName,
                                goodsPrice:this.form.goodsPrice,
                                isHot:this.value,
                                isSales:this.isSalesvalue,
                                goodsPicture:this.pictureUrl,
                                goodsDescription:this.form.goodsDescription
                            }
                        }
                        else {
                            this.goodsData = {
                                categorysubId:this.categorysubId,
                                goodsName:this.form.goodsName,
                                goodsPrice:this.form.goodsPrice,
                                isHot:this.value,
                                isSales:this.isSalesvalue,
                                salesPrice:this.form.salesPrice,
                                salesTime:this.salesTime,
                                goodsPicture:this.pictureUrl,
                                goodsDescription:this.form.goodsDescription
                            }
                        }
                        const result = await this.$http.post('/goods/addgoods',this.goodsData)
                        console.log(result)
                        if(result) {
                            const { code, message } = result.data
                            if(code == 200 && message) {
                                Message({
                                    message: message,
                                    type: 'success',
                                    center:'true',
                                    duration:'2000'
                                });
                                Message.close()
                            }
                            else {
                                Message({
                                message: message,
                                type: 'error',
                                center:'true',
                                duration:'2000'
                            });
                            Message.close()
                        }   
                        }
                        else {
                        Message({
                            message: '服务器出现问题！',
                            type: 'error',
                            center:'true',
                            duration:'2000'
                        });
                        Message.close()
                        }
                    }
                    catch(error) {
                        console.log(error)
                        Message({
                            message: '网络出现问题！',
                            type: 'error',
                            center:'true',
                            duration:'2000'
                        });
                        Message.close()
                    }
                }
            })
        },
        resetForm(form) {
            console.log('你点击了重置按钮')
            this.$refs[form].resetFields();
            console.log(this.value)
            console.log(this.isSalesvalue)
            console.log(this.salesTime)
            console.log(this.categorysubId)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.file = file
            return isJPG && isLt2M;
        },
        async addpicture() {
            let data = new FormData();
            data.append('file',this.file)
            console.log(data)
            let config = {
            headers:{'Content-Type':'multipart/form-data'}
            };
            try {
                const result = await this.$http.post('/test/upload',data,config)
                if(result) {
                    const { code, message } = result.data
                    if(code ==200 && message) {
                        console.log('图片上传成功！')
                        this.pictureUrl = message.url
                    }
                }
                else {
                    console.log('图片上传失败！')
                }
            }
            catch(error) {
                console.log(error)
                console.log('网络出现问题！')
            }
        }  ,
        async startGoods() {
            //this.categorysubId = this.$route.query.goodsId
            //console.log(this.categorysubId)
            try {
                const res = await this.$http.get('/category/getcategorysublist')
                if(res) {
                    const {code,message} = res.data
                    if(code == 200 && message) {
                        this.categorysub = message
                        this.firstName = this.categorysub[0].name
                    }
                    else {
                        console.log(message)
                    }
                }
                else {
                    console.log('服务器出现问题！')
                }
            }
            catch(error) {
                console.log(error)
                console.log('网络出现问题！')
            }
            this.isOpen = false
        },
    },
    watch : {
       isSalesvalue(newValue,oldValue) {
           if(newValue == 'true') {
               this.isOpen = true
           }else {
               this.isOpen = false
           }
           console.log('数据发生变化')
       }
    },
}
</script>
<style scoped>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>