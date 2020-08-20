<template>
    <div>
        <component :is="currentView"></component>
    </div>
</template>
<script>
import UpdataGoods from '../components/UpdataGoods.vue'
export default {
    props:['componentName'],
    data() {
        return {
        }
    },
    computed:{
        currentView() {
            switch(this.componentName){
	            case '130':
                //这里是值对应的处理
                return UpdataGoods
		        break
	            case '12':
                //这里是值对应的处理
                return
		        break
	            default:
                //这里是没有找到对应的值处理
                return 
		        break
            }   
        }
    }
}
</script>