<template>
    <div>
        <el-input v-model="name" placeholder="请输入轮播图名称"></el-input>
        <el-input v-model="url" placeholder="请输入轮播图地址"></el-input>
        <el-button type="primary" @click="addBanner">提交</el-button>
    </div>
</template>
<script>
export default {
     data() {
        return {
            name: '',
            url:'',
        }
    },
    methods : {
        async addBanner() {
            if(!(this.name =='' || this.url == '')) {
                try{
                    const res = await this.$http.post('/banner/addCates',{
                        name:this.name,
                        url:this.url
                    })
                    if(res) {
                        const { code , message } = res.data
                        if(code == 200 && message ) {
                            console.log(res)
                        }
                    }
                    else {
                        console.logg('失败')
                    }
                }
                catch(error) {
                    console.log(error)
                }
            }
        }
    }
}
</script>
<style scoped>

</style>