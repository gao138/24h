import Vue from 'vue'
import Router from 'vue-router'
import Vueresource from'vue-resource'

import home from '@/components/home'
import mine from '@/components/mine'
import details from '@/components/details'
import payment from '@/components/payment'
import addbank from '@/components/addbank'
import coffeemachine from '@/components/coffeemachine'
import mywallet from '@/components/mywallet'
import verificationbank from '@/components/verificationbank'
import aboutmine from '@/components/aboutmine'
import mo from '@/components/mo'
import vip from '@/components/vip'
import redenvelopes from '@/components/redenvelopes'


Vue.use(Router)
Vue.use(Vueresource)
export default new Router({
  // mode:'hash',
  routes: [
  	{
  		path:"/",
  		redirect:"/home"
  	},
     {
      path: '/home',
      name: 'home',
      component: home,
      meta: {  
        title: '24咖啡'  
      }  
      // children:[{
      // 	path:"/home/part1",
      // 	component:part1
      // },
      // {
      // 	path:"/home/part2",
      // 	component:part2
      // }]
    },
     {
      path: '/payment',
      name: 'payment',
      component: payment,
      meta: {  
        title: '购买详情'  
      }  
    },
     {
      path: '/details',
      name: 'details',
      component: details,
      meta: {  
        title: '24咖啡'  
      }  
    },
    {
      path: '/addbank',
      name: 'addbank',
      component: addbank,
      meta: {  
        title: '添加银行卡'  
      }  
    },
    {
      path: '/verificationbank',
      name: 'verificationbank',
      component: verificationbank,
      meta: {  
        title: '验证银行卡信息'  
      }  
    },
     {
      path: '/coffeemachine',
      name: 'coffeemachine',
      component: coffeemachine,
      meta: {  
        title: '我的咖啡机'  
      }  
    },
     {
      path: '/mywallet',
      name: 'mywallet',
      component: mywallet,
      meta: {  
        title: '我的钱包'  
      }  
    },
     {
      path: '/mine',
      name: 'mine',
      component: mine,
       meta: {  
        title: '我的'  
      }  
    },
     {
      path: '/aboutmine',
      name: 'aboutmine',
      component: aboutmine,
       meta: {  
        title: '关于我们'  
      }  
    },
    {
      path: '/mo',
      name: 'mo',
      component: mo,
       meta: {  
        title: '24模式'  
      }  
    },
    {
      path: '/vip',
      name: 'vip',
      component: vip,
       meta: {  
        title: '会员商城'  
      }  
    },
    {
      path: '/redenvelopes',
      name: 'redenvelopes',
      component: redenvelopes,
       meta: {  
        title: '红包大战'  
      }  
    },
  ]
})
