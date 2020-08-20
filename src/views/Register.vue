<template>
    <div class="login_container">
        <div class="login_body">
            <div class="login_img">
                <img src="../assets/logo.png" />
            </div>
            <div class="login_txt">
                <el-form ref="form" :model="form" :rules="rules"  >
                    <el-form-item prop="username">
                        <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-model="form.phone" prefix-icon="el-icon-phone" placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="form.email" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="doRegister('form')">注册</el-button>
                        <el-button type="info" @click="resetRegister('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script> 
import { Message } from 'element-ui'
export default {
    data() {
        return {
            form:{
                username:'',
                password:'',
                phone:'',
                email:'',
            },
            rules:{
                username:[
                    {
                        required:true,message:'用户名不能为空！',trigger:'blur'
                    },
                    {
                        min:3,max:8,message:'用户名控制在3到8个字符！',trigger:'blur'
                    }
                ],
                password:[
                    {
                        required:true,message:'密码不能为空！',trigger:'blur'
                    },
                    {
                        min:6,max:15,message:'密码不符合规定！',trigger:'blur'
                    }
                ],
                phone:[
                    {
                        required:true,message:'电话项不能为空！',trigger:'blur'
                    },
                    {
                        max:11,message:'电话格式错误！',trigger:'blur'
                    }
                ],
                email:[
                    {
                        required:true,message:'邮箱项不能为空！',trigger:'blur'
                    }
                ]
            }
        }
    },
    methods: {
        doRegister(form) {
            console.log(this.form.phone,this.form.email)  //打印用户输入的用户名和密码
            this.$refs[form].validate(async valid => {
                console.log(valid)    //打印校验结果，校验通过才能发送请求
                if(!valid) return;
                try {
                    const result = await this.$http.post('/user/register', {
                        username :this.form.username,
                        password :this.form.password,
                        phone :this.form.phone,
                        email :this.form.email
                    })
                    if(result) {
                        const {code ,message} = result.data
                        console.log(result.status)   //打印响应体的状态
                        console.log(code,message)   //打印code，message
                        if(code==200 && message) {
                            const redirect = this.$route.query.redirect
                            console.log(redirect)
                            Message({
                                message: message,
                                type: 'success',
                                center:'true',
                                duration:'2000'
                            });
                            Message.close()
                            if(redirect == '/') {
                                setTimeout(() => {
                                this.$router.push('/login')
                                },2000)
                            }
                            else {
                                setTimeout(() => {
                                this.$router.push({
                                    path:'/login',
                                    query:{
                                        redirect:redirect
                                    }
                                })
                                },2000)
                            }
                        }else {
                            console.log(result.status)   //打印响应体的状态
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
                }catch(error) {
                    console.log(error)    //打印不能发送请求的原因
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
        resetRegister(form) {
            this.$refs[form].resetFields();
        },
    },
}
</script>
<style scoped>
.login_container {
    height:100%;
    background-color:#2b4b6b;
}
.login_body {
    width:450px;
    height:430px;
    background-color:#fff;
    border-radius:3px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
.login_img {
    height:130px;
    width:130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding:10px;
    position:absolute;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;

}
.login_img img {
    height:100%;
    width:100%;
    border-radius: 50%;
    background-color: #eee;
}
.login_txt {
    margin-top:100px;
}
</style>