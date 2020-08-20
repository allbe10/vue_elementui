import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button,Form,FormItem,Input,Icon,Container,Header,Aside,Main,Menu,Submenu,MenuItem,Upload,Select,Option,DatePicker,PageHeader,Footer,Table,TableColumn, Pagination} from 'element-ui'
import '../src/assets/css/global.css'
import axios from 'axios'
import interceptor from './http-interceptor'



axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Button).use(Form).use(FormItem).use(Input).use(Icon).use(Container).use(Header).use(Aside).use(Main).use(Menu).use(Submenu).use(MenuItem)
Vue.use(Upload).use(Select).use(Option).use(DatePicker).use(PageHeader).use(Footer).use(Table).use(TableColumn).use(Pagination)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
