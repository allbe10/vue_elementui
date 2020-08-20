<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商品分类名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入商品分类名称" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品分类描述" prop="describe">
                <el-input v-model="form.describe" placeholder="请输入商品分类描述" maxlength="50" show-word-limit></el-input>
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
        return {
            form : {
                name:'',
                describe:'',
            },
            rules : {
                name :[
                    { required: true, message: '请输入商品分类名称', trigger: 'blur' },
                ],
                describe :[
                    { required: true, message: '请输入商品分类描述', trigger: 'blur' },
                ]
            }
        }
    },
    methods : {
        submitForm(form) {
            console.log('你点击了提交按钮')
            this.$refs[form].validate(async(valid) => {
                if(!valid) return;
                try {
                    const result = await this.$http.post('/category/addcategory',{
                        mallId:this.$route.query.searchId,
                        name:this.form.name,
                        describe:this.form.describe
                    })
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
                    Message({
                        message: '网络出现问题！',
                        type: 'error',
                        center:'true',
                        duration:'2000'
                    });
                    Message.close()
                }
            })
        },
        resetForm(form) {
            console.log('你点击了重置按钮')
            this.$refs[form].resetFields();
        }
    }
}
</script>
<style scoped>

</style>