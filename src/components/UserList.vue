<template>
    <div>
        <el-container>
            <el-header>
                <div class="header_div">
                    <span>用户列表</span>
                    <div>
                        <el-button type="primary" @click="addGoods" size="medium">添加用户</el-button>
                    </div>
                </div>
            </el-header>
            <el-main>
                <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="_id"
                        label="id"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="昵称"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="password"
                        label="密码"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width="175">
                    </el-table-column>
                    <el-table-column
                        prop="createAt"
                        label="注册时间"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="lastLoginAt"
                        label="最后登录时间"
                        width="200">
                    </el-table-column>
                    <el-table-column label="商品操作" width="150">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
export default {
    props:['componentName'],
    data() {
        return {
            tableData: [],
            id:'',
        }
    },
    created() {
        this.getGoods()
    },
    methods : {
        addGoods() {
            let componentName = '100'
            console.log('添加商品')
            this.$emit('fnc',componentName)
        },
        async handleEdit(index, row) {
            let componentName = '130'
            console.log('编辑商品')
            this.$emit('fnc',componentName)
        },
        async handleDelete(index, row) {
            console.log(index, row);
            this.id = row._id
            console.log(this.id)
            for (let i = 0;i < this.tableData.length; i++){
                if (this.tableData[i]._id==this.id){
                    this.tableData.splice(i,1)
                    try{
                        const res = await this.$http.post('/user/deleteuser',{
                            userId:this.id
                        })
                        if(res) {
                            console.log(res.data)
                            console.log('删除成功，慎重删除！')
                        }
                        else {
                            console.log('服务器出现问题！')
                        }
                    }
                    catch(error) {
                        console.log('网络出现问题！')
                    }
                }
            }
        },
        async getGoods() {
            try {
                const res = await this.$http.get('/user/getuserList')
                if(res){
                    const {code,message} = res.data
                    if(code ==200 && message){
                        this.tableData = message
                        console.log('商品列表获取成功！')
                        console.log(this.tableData)
                    }
                    else {
                        console.log('商品列表获取失败！')
                    }
                }
                else{
                    console.log('服务器出现问题！')
                }
            }
            catch(error) {
                console.log(error)
                console.log('网络出现问题！')
            }
            console.log('接收的数据为' + this.componentName)
        }
    },
    watch: {
        tableData(newValue) {
            console.log('数据改变了')
            this.tableData = newValue
        }
    }
}
</script>
<style scoped>
    span {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.5rem;
    }
    .header_div {
        display:flex;
        justify-content:space-between;
    }
</style>