<template>
    <div>
        <el-container>
            <el-header>
                <div class="header_div">
                    <span>商品列表</span>
                    <div>
                        <el-button type="primary" @click="addGoods" size="medium">添加商品</el-button>
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
                        prop="createAt"
                        label="日期"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="goodsName"
                        label="商品名称"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="goodsPrice"
                        label="商品价格"
                        :formatter="goodsPriceBoolean"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="goodsPicture"
                        label="商品图片"
                        width="100">
                        <template slot-scope="scope">
　　　　                    <img :src="scope.row.goodsPicture" width="100%" height="100%" />
　　                    </template>
                    </el-table-column>
                    <el-table-column
                        prop="isHot"
                        label="商品类型"
                        :formatter="isHotBoolean"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="isSales"
                        label="是否促销"
                        :formatter="isSalesBoolean"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="salesPrice"
                        label="促销价格"
                        :formatter="salesPriceBoolean"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="salesTime"
                        label="促销结束时间"
                        :formatter="salesTimeBoolean"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        prop="goodsDescription"
                        label="商品描述">
                    </el-table-column>
                    <el-table-column label="商品操作" width="200">
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
                        const res = await this.$http.post('/goods/deletegoods',{
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
        isHotBoolean(row, column, cellValue) {
            let isHot = ''
            if (cellValue) {
                isHot = "热门商品"  //根据自己的需求设定
            } else {
                isHot = "普通商品"
            }
            return isHot;
        },
        isSalesBoolean(row, column, cellValue) {
            let isSales =''
            if (cellValue) {
                isSales = "促销商品"  //根据自己的需求设定
            } else {
                isSales = "普通商品"
            }
            return isSales;
        },
        salesPriceBoolean(row, column, cellValue) {
            let salesPrice = ''
            if (cellValue == 0 || cellValue == '') {
                this.salesPrice = 0  //根据自己的需求设定
            } else {
                this.salesPrice = cellValue.toFixed(2)
            }
            return this.salesPrice;
        },
        salesTimeBoolean(row, column, cellValue) {
            let salesTime = ''
            if (cellValue == '0' || cellValue == '') {
                salesTime = '0' //根据自己的需求设定
            } else {
                let newTime = JSON.parse(cellValue)
                let date = new Date(newTime + 8 * 3600 * 1000); // 增加8小时
                salesTime = date.toJSON().substr(0, 19).replace('T', ' ');
            }
            return salesTime;
        },
        goodsPriceBoolean(row, column, cellValue) {
            let goodsPrice = ''
            if (cellValue == 0) {
                goodsPrice = 0 //根据自己的需求设定
            } else {
                goodsPrice = cellValue.toFixed(2)
            }
            return goodsPrice;
        },
        async getGoods() {
            try {
                const res = await this.$http.get('/goods/getgoodslist')
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