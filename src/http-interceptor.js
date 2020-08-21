import axios from 'axios'
import store from './store'
import router from './router'
import { Message } from 'element-ui'


axios.interceptors.request.use(
    config => {
        if(store.state.token) {
            config.headers.token = store.state.token
        }
        return config
    }
)


axios.interceptors.response.use(
    response => {
        if(response.status == 200) {
            const {code,message} = response.data
            if(code == -1) {
                store.commit('setToken','')
                store.commit('setadminId','')
                localStorage.removeItem('token')
                Message({
                    message: message,
                    type: 'success',
                    center:'true',
                    duration:'2000'
                });
                Message.close()
            }
            return response
        }
    },err => {
        console.log(err)
        if(err.response.status == 401) {
            console.log(err.response)
            const message = err.response.data.message
            store.commit('setToken','')
            store.commit('setadminId','')
            localStorage.removeItem('token')
            Message({
                message: message,
                type: 'error',
                center:'true',
                duration:'2000'
            });
            Message.close()
            setTimeout(() => {
                router.push({
                    path:'/login',
                    query:{
                        redirect:router.currentRoute.path
                    }
                })
            },2000)
        }
    }
)