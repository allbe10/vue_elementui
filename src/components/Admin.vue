<template>
    <div>
        <el-container>
            <el-header>
                <div class="text">
                    <span>个人中心</span>
                </div>
            </el-header>
            <el-main>
                <div class="main_box">
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                        <el-form-item label="您的名称：" prop="adminName">
                            <el-input v-model="form.adminName"></el-input>
                        </el-form-item>
                        <el-form-item label="您的密码：" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="您的电话：" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="您的邮箱：" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="updataAdminInfo" :loading="isLoading" :disabled="isShow">修改信息</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
export default {
    props:['componentName'],
    data() {
        return {
            adminId:'',
            form:{
                adminName:'',
                password:'',
                phone:'',
                email:'',
            },
            rules:{
                adminName:[
                    {
                        required:true,message:'管理员名不能为空！',trigger:'blur'
                    },
                    {
                        min:3,max:8,message:'管理员名控制在3到8个字符！',trigger:'blur'
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
            },
            newAdminInfo:{},
            isSame:true,
            isShow:false,
            isLoading:false,
            adminData:{}
        }
    },
    created() {
        this.getAdminInfo()
    },
    methods : {
        async getAdminInfo() {
            this.adminId = this.$store.getters.getAdminId
            if(this.adminId) {
                try {
                    const res = await this.$http.post('/admin/getadmin',{
                        id:this.adminId
                    })
                    if(res) {
                        const {code,message} =res.data
                        if(code==200 && message) {
                            this.form = message
                            this.newAdminInfo = JSON.parse(JSON.stringify(message))
                            console.log(message)
                        }
                        else {
                            console.log(message)
                        }
                    }
                    else {
                       console.log("服务器出现问题") 
                    }
                }
                catch(error) {
                    console.log("网络出现问题")
                }
            }
            else {
                console.log('没有管理员id')
            }
        },
        async updataAdminInfo() {
            let form1 = this.form
            let newAdminInfo1 = this.newAdminInfo
            let aProps = Object.getOwnPropertyNames(form1);
            let bProps = Object.getOwnPropertyNames(newAdminInfo1);
            //判断属性名的length是否一致
            if (aProps.length != bProps.length) {
                return false;
            }
            //循环取出属性名，再判断属性值是否一致
            for (let i = 0; i < aProps.length-2; i++) {
                let propName = aProps[i];
                console.log(form1[propName] + '+' + newAdminInfo1[propName])
                if (form1[propName] !== newAdminInfo1[propName]) {
                    this.isSame = false
                    this.adminData[propName] = form1[propName]
                }
            }
            if(this.isSame) {
                MessageBox.alert("你需要修改信息", "管理员你好！", {
                    confirmButtonText: "确定",
                    callback: action => {
                        console.log('用户信息没有改变')
                    }
                })
            }
            else {
                MessageBox.confirm("是否要修改信息？", "管理员你好！", {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "修改",
                    cancelButtonText: "放弃"
                })
                .then(async() => {
                    try {
                        this.isShow = true
                        this.isLoading = true
                        const data = this.adminData
                        const res = await this.$http.post('/admin/updata',{
                            data:data,
                            id:this.$store.getters.getAdminId
                        })
                        if(res) {
                            const {code,message} = res.data
                            if(code==200 && message) {
                                this.isShow = false
                                this.isLoading = false
                                Message({
                                    message: message,
                                    type: 'success',
                                    center:'true',
                                    duration:'2000'
                                });
                            }
                            else {
                                this.isShow = false
                                this.isLoading = false
                                Message({
                                    message:message,
                                    type: 'success',
                                    center:'true',
                                    duration:'2000'
                                });
                            }
                        }
                        else {
                            this.isShow = false
                            this.isLoading = false
                            Message({
                                message: "服务器错误!",
                                type: 'success',
                                center:'true',
                                duration:'2000'
                            });
                        }
                    }
                    catch(error) {
                        this.isShow = false
                        this.isLoading = false
                        Message({
                            message: "系统错误!",
                            type: 'success',
                            center:'true',
                            duration:'2000'
                        }); 
                    }
                })
                .catch(action => {
                    Message({
                        type: "info",
                        message: action === "cancel"
                        ? "放弃保存并离开页面"
                        : "停留在当前页面"
                    })
                })
            }
        },
    },
}
</script>
<style scoped>
    .text {
        width:100px;
        margin-left:0px;
    }
    .text span {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.5rem;
    }
    .main_box {
        margin:auto;
        width:500px;
    }
</style>