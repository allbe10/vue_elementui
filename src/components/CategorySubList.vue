<template>
    <div>
        <el-container>
            <el-header>
                <div class="header_div">
                    <span>商品二级分类列表</span>
                    <div>
                        <el-button type="primary" @click="addCategoryList" size="medium">添加二级分类</el-button>
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
                        prop="CreateAt"
                        label="录入日期"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="categoryId"
                        label="所属一级分类Id"
                        width="210">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商品二级分类名称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="describe"
                        label="商品二级分类描述"
                        >
                    </el-table-column>
                    <el-table-column label="分类操作" width="200">
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
        this.getCategorySubList()
    },
    methods : {
        handleEdit(index, row) {
            console.log(index, row);
        },
        async handleDelete(index, row) {
            console.log(index, row);
            this.id = row._id
            console.log(this.id)
            for (let i = 0;i < this.tableData.length; i++){
                if (this.tableData[i]._id==this.id){
                    this.tableData.splice(i,1)
                    try{
                        const res = await this.$http.post('/category/deletecategorysub',{
                            id:this.id
                        })
                        if(res) {
                            console.log(res)
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
        async getCategorySubList() {
            try {
                const res = await this.$http.get('category/getcategorysublist')
                if(res){
                    const {code,message} = res.data
                    if(code ==200 && message){
                        this.tableData = message
                        console.log('商品二级分类列表获取成功！')
                        console.log(this.tableData)
                    }
                    else {
                        console.log(message)
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
        },
        addCategoryList() {
            console.log('跳转到添加二级分类页面')
            let componentName = '120'
            console.log('添加二级分类')
            this.$emit('fnc',componentName)
        }
    },
    watch: {
        tableData(newValue) {
            console.log('数据改变了')
            this.tableData = newValue
        },
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