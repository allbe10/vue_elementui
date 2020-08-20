<template>
    <div>
        <el-button type="primary" @click="adduser">生成用户数据</el-button>
        <el-button type="primary" @click="addfood">生成商品数据</el-button>
        <el-button type="primary" @click="addcate">生成商品一级分类数据</el-button>
        <el-button type="primary" @click="addcates">生成商品二级分类数据</el-button>
        <el-button type="primary" @click="addnews">生成系统新闻数据</el-button>
        <el-button type="primary" @click="addmessages">生成系统公告数据</el-button>
        <el-button type="primary" @click="addorder">生成用户订单</el-button>
        <el-button type="primary" @click="addheight">生成销量报表</el-button>
    </div>
</template>
<script>
import Mock from 'mockjs'
export default {
    data() {
        return {
            data:''
        }
    },
    methods: {
        async adduser() {
            this.data = Mock.mock({
                'lists|10':[{
                    "username":"@cname",
                    "password":/\d{6,15}/,
                    "phone":/\d{11}/,
                    "email":"@email",
                }]
            })
            console.log(this.data.lists)
            if(this.data.lists) {
                try {
                    const res = await this.$http.post('/user/adduser',{
                        data:this.data.lists
                    })
                    if(res) {
                        const { code ,message } = res.data
                        if(code == 200 && message) {
                            console.log(message)
                        }
                        else {
                            console.log('失败1')
                        }
                    }
                    else {
                        console.log('失败2')
                    }
                }
                catch(error) {

                }
            }else {
                console.log("数据创建失败")
            }
        },
        addfood() {},
        addcate() {},
        addcates() {},
        addnews() {},
        addmessages() {},
        addorder() {},
        addheight() {}
    }
}
</script>
<style scoped>

</style>