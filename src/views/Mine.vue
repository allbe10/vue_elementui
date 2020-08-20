<template>
    <div>
        <el-button type="primary" @click="logout">退出登录</el-button>
        <div>
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
        </div>
        <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
    </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
    data() {
        return {
            imageUrl:'',
            file:{}
        }
    },
    methods: {
        async logout() {
            try {
                const result = await this.$http.get('/user/logout')
                console.log(result)
            }catch(error) {
                console.log(error)
                Message({
                    message: '退出登录成功！',
                    type: 'error',
                    center:'true',
                    duration:'2000'
                });
                Message.close()
            }
        },
        handleAvatarSuccess(res, file) {
            var reader = new FileReader();
            this.imageUrl = URL.createObjectURL(file.raw);
            // reader.readAsDataURL(file.files[0]);//异步读取文件内容，结果用data:url的字符串形式表示
            //     /*当读取操作成功完成时调用*/
            // reader.onload = function(e) {
            //     console.log(e); //查看对象
            //     console.log(this.result);//要的数据 这里的this指向FileReader（）对象的实例reader
            // }
            console.log(this.imageUrl)
            console.log(file)
            console.log(res)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log('1111111')
            if (!isJPG) {
                Message({
                    message: '格式不对！',
                    type: 'error',
                    center:'true',
                    duration:'2000'
                });
                Message.close()
            }
            if (!isLt2M) {
                Message({
                    message: '文件太大！',
                    type: 'error',
                    center:'true',
                    duration:'2000'
                });
                Message.close()
            }
            this.file = file
            return isJPG && isLt2M;
        },
        update (e) {   // 上传照片
            let self = this
            let file = e.target.files[0]
            /* eslint-disable no-undef */
            let param = new FormData()  // 创建form对象
             param.append('file', file)  // 通过append向form对象添加数据
            param.append('chunk', '0') // 添加form表单中其他数据
            console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            this.$http.post('http://localhost:3000/test/upload', param, config)
            .then(res => {
                if (res.data.code === 200) {
                self.ImgUrl = res.data.data
            }
                console.log(res.data)
            })
        },
        async addpicture() {
            console.log('没有执行这里吗')
            let data = new FormData();
            data.append('file',this.file)
            console.log(data)
            let config = {
            headers:{'Content-Type':'multipart/form-data'}
            };
            try {
                const result = await this.$http.post('/test/upload',data,config)
                console.log(result)
            }
            catch(error) {
                console.log(error)
            }
        }  
    }
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