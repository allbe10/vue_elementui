<template>
    <div class="div_body">
        <el-container class="container_body">
            <el-header class="container_header">
                <div class="div_header">
                    <img src= "../assets/shouye.jpg"/>
                    <span>电商后台管理系统</span>
                </div>
                <el-button type="info" @click="logout" v-if="!isLogin">退出</el-button>
                <el-button type="info" @click="login" v-if="isLogin">登录</el-button>
            </el-header>    <!--头部区域 -->
            <el-container>    <!--主体区域 -->
                <el-aside width="200px" class="container_aside">    <!--左边区域 -->
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :unique-opened="true">
                        <el-submenu :index="item.id" v-for="item in mall" :key="item.id">
                            <template slot="title">
                                <i class="el-icon-platform-eleme"></i>
                                <span>{{item.mallName}}</span>
                            </template>
                            <el-menu-item :index="subItem.id" v-for="subItem in item.nextMall" :key="subItem.id" @click="getgoods(subItem.id)">{{subItem.nextName}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>   
                <el-main class="container_main">
                    <div>
                        <keep-alive>
                            <component :is="currentView" @fnc="getsubcomponentName" :componentName="this.componentName"></component>
                        </keep-alive>
                        <router-view />
                    </div>
                </el-main>      <!--主题内容区域 -->
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {Message} from 'element-ui'
import Goods from '../components/Goods.vue'
import GoodsList from '../components/GoodsList.vue'
import Category from '../components/Category.vue'
import CategoryList from '../components/CategoryList'
import CategorySub from '../components/CategorySub.vue'
import CategorySubList from '../components/CategorySubList.vue'
import Index from '../components/Index.vue'
import AddList from '../components/AddList.vue'
import UpdataList from '../components/UpdataList.vue'
import News from '../components/News.vue'
import UserList from '../components/UserList'
export default {
    data() {
        return {
            mall:[{
                mallName:'商品管理页',
                id:'1',
                nextMall:[{
                    nextName:'商品列表',
                    id:'11'
                }]
                },{
                mallName:'商品分类页',
                id:'2',
                nextMall:[{
                    nextName:'商品一级分类',
                    id:'21'
                },{
                    nextName:'商品二级分类',
                    id:'22' 
                }]
                },{
                mallName:'新闻公告页',
                id:'3',
                nextMall:[{
                    nextName:'系统新闻',
                    id:'31'
                },{
                    nextName:'系统公告',
                    id:'32' 
                }]
                },{
                mallName:'管理员管理',
                id:'4',
                nextMall:[{
                    nextName:'个人中心',
                    id:'41'
                },{
                    nextName:'用户管理',
                    id:'42' 
                }]
                },{
                mallName:'用户订单页',
                id:'5',
                nextMall:[{
                    nextName:'用户订单',
                    id:'51'
                }]
                },{
                mallName:'销量报表页',
                id:'6',
                nextMall:[{
                    nextName:'图形列表',
                    id:'61'
                }]
            }],
            isLogin:'',
            keyPath:[],
            searchId:'',
            searchUrl:'',
            category:[],
            categorysubId:'',
            categorysub:[],
            mallId:'',
            componentName:'',
            goodsList:[],
        }
    },
    created() {
        this.checkIslogin()
    },
    methods: {
        async logout() {
            const res = await this.$http.get('/user/logout')
            if(res) {
                this.isLogin = true
            }
        },  
        handleOpen(key, keyPath) {
            console.log(key)
            console.log(keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
            console.log('关闭导航菜单！')
        },
        login() {
            if(!localStorage.token) {
                this.$router.push('/login')
            }
        },
        checkIslogin() {
            if(localStorage.token) {
                this.isLogin = false
            }
            else {
                this.isLogin = true
            }
        },
        async getgoods(index) {
            this.componentName = index
        },
        getsubcomponentName(data) {
            this.componentName = data
            console.log(this.componentName)
        }
    },
    components :{
        Goods,
        GoodsList,
        Category,
        CategoryList,
        CategorySub,
        CategorySubList,
        UpdataList,
        News,
    },
    computed : {
        currentView(){
            console.log('333333333执行了')
            switch(this.componentName){
	            case '11':
                //这里是值对应的处理
                return GoodsList
		        break
	            case '21':
                //这里是值对应的处理
                return CategoryList
                break
                case '22':
                //这里是值对应的处理
                return CategorySubList
                break
                case '42':
                //这里是值对应的处理
                return UserList
		        break
                case '100':
                //这里是值对应的处理
                return AddList
                break
                case '110':
                //这里是值对应的处理
                return AddList
                break
                case '120':
                //这里是值对应的处理
                return AddList
                break
                case '130':
                //这里是值对应的处理
                return  UpdataList
                break
	            default:
                //这里是没有找到对应的值处理
                return  Index
		        break
            }   
        },
    },
}
</script>
<style scoped>
    .div_body {
       height:100%; 
    }
    .container_body {
        height:100%;
    }
    .container_header {
        background-color: #373d41;
        display:flex;
        justify-content: space-between;
        align-items: center;
        color:#fff;
        padding-left:0;
    }
    .container_aside {
        background-color: #333744;
    }
    .container_main {
        background-color: #eaedf1;
    }
    .div_header img{
        height:2rem;
        width:2rem;
        border-radius: 3px;
    }
    .div_header span{
        font-size: 1.7rem;
    }
</style>