<template>
    <div class="login_container">
        <div class="login_body">
            <div class="login_img">
                <img src="../assets/logo.png" />
            </div>
            <div class="login_txt">
                <el-form ref="form" :model="form" :rules="rules"  >
                    <el-form-item prop="username">
                        <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="doLogin('form')" :disabled="disabled">登录</el-button>
                        <el-button type="info" @click="resetLogin('form')" :disabled="disabled">重置</el-button>
                    </el-form-item>
                </el-form>
                <div>
                    没有账号？<span @click="doRegister">去注册</span>
                </div>
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
                ]
            },
            disabled:false
        }
    },
    methods: {
        doLogin(form) {
            console.log(this.form.username,this.form.password)  //打印用户输入的用户名和密码
            this.$refs[form].validate(async valid => {
                console.log(valid)    //打印校验结果，校验通过才能发送请求
                if(!valid) return;
                    try {
                    const result = await this.$http.post('/user/login', {
                    username :this.form.username,
                    password :this.form.password
                    })
                    if(result) {
                        const {code ,message,token } = result.data
                        console.log(result.status)   //打印响应体的状态
                        console.log(code,message)   //打印code，message
                        if(code==200 && message) {
                            Message({
                                message: message,
                                type: 'success',
                                center:'true',
                                duration:'2000'
                            });
                            Message.close()
                            localStorage.setItem('token',token)
                            this.$store.commit('setToken',token)
                            console.log(this.$store.state.token)
                            const redirect = this.$route.query.redirect || '/'
                            setTimeout(() => {
                                this.$router.push(redirect)
                            },2000)
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
        resetLogin(form) {
            this.$refs[form].resetFields();
        },
        checkLogin() {
            if(localStorage.token) {
                    this.disabled = true
                    console.log(this.$route.query.redirect)
                    const redirect = this.$route.query.redirect || '/'
                    Message({
                        message: '你已经登录过了！',
                        type: 'success',
                        center:'true',
                        duration:'2000'
                        });
                    Message.close()
                    setTimeout(() => {
                        this.$router.push(redirect)
                    },2000)
            }
        },
        doRegister() {
            const redirect = this.$route.query.redirect || '/'
            console.log(redirect)
                this.$router.push({
                    path:'/register',
                    query:{
                        redirect:redirect 
                    }
                })
        }
    },
    created() {
        this.checkLogin()
    }
}
</script>
<style scoped>
.login_container {
    height:100%;
    background-color:#2b4b6b;
}
.login_body {
    width:450px;
    height:330px;
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
span {
    color:red
}

</style>