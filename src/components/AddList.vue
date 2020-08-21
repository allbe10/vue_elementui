<template>
    <div>
        <component :is="currentView"></component>
    </div>
</template>
<script>
import Goods from '../components/Goods.vue'
import Index from '../components/Index.vue'
import Category from '../components/Category.vue'
import CategorySub from '../components/CategorySub.vue'
import UserList from '../components/UserList'
export default {
    props:['componentName'],
    data() {
        return {
        }
    },
    computed:{
        currentView() {
            console.log(this.componentName)
            switch(this.componentName){
	            case '100':
                //这里是值对应的处理
                return Goods
		        break
	            case '110':
                //这里是值对应的处理
                return Category
                break
                case '120':
                //这里是值对应的处理
                return CategorySub
                break
                case '130':
                //这里是值对应的处理
                return UserList
		        break
	            default:
                //这里是没有找到对应的值处理
                return Index 
		        break
            }   
        }
    },
}
</script>