import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Mine from '../views/Mine.vue'
import Category from '../components/Category.vue'
import Register from '../views/Register.vue'
import CategorySub from '../components/CategorySub.vue'
import Goods from '../components/Goods.vue'
import GoodsList from '../components/GoodsList.vue'
import CategoryList from '../components/CategoryList.vue'
import CategorySubList from '../components/CategorySubList.vue'
import Index from '../components/Index.vue'
import AddList from '../components/AddList.vue'
import UpdataList from '../components/UpdataList.vue'
import Banner from '../views/Banner'
import newData from '../views/newData'
import store from '../store'
import { redirect } from '../../service/appApi/goods'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/newdata',
    name: 'newData',
    component: newData,
  },
  {
    path: '/banner',
    name: 'Banner',
    component: Banner,
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/mine',
    name:'Mine',
    meta:{
      auth:true
    },
    component:Mine
  },
  {
    path:'/register',
    name:'Register',
    component:Register
  },
  {
    path:'/categorysub',
    name:'CategorySub',
    component:CategorySub
  },
  {
    path: '/categorylist',
    name: 'CategoryList',
    component: CategoryList
  },
  
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path:'/category',
    name:'Category',
    component:Category
  },
  {
    path:'/addlist',
    name:'AddList',
    component:AddList
  },
  {
    path:'/updatalist',
    name:'UpdataList',
    component:UpdataList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.auth) {
    if(store.state.token) {
      next()
    }else {
      next({
        path:'/login',
        query:{
          redirect:to.path
        }
      })
    }
  }else {
    next()
  }
})

export default router
