// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Content from './components/Content.vue'
import Login from './components/Login/Login.vue'
import Layout from './components/Home/Layout.vue' 
import Home from './components/Home/Home/index.vue'
import Project from './components/Home/Project/index.vue'
import Canshu from './components/Home/Canshu/index.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Element from 'element-ui'
import echarts from "echarts";

Vue.prototype.$echarts = echarts;
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../src/assets/style.css'
import './theme/index.css'
import '../src/assets/aliyun/iconfont.css'
import '../src/assets/aliyun/iconfont.js'


Vue.use(Element)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = axios


const router = new VueRouter({
    routes: [
        {   path: "/", 
            component: Login, 
            meta: {title: "登录页面"},
        },
        {   path: "/Layout", 
            component: Layout, 
            meta: {title: "主页"},

            children:[{
                path:'/Home',
                name:'Home',
                component: Home,
            },
            {
                path:'/Content',
                name: Content,
                component: Content,
            },
            {
                path:'/Canshu',
                name: 'Canshu',
                component: Canshu,
            },
            {
                path:'/Project',
                name: 'Project',
                component: Project,
            },

            ]


        },
        {   path: "/content", 
            component: Content, 
            meta: {title: "开放世界目标检测系统"},
        },
    ],
    mode: "history"
})

// // 全局注册组件
Vue.component("App", App);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
