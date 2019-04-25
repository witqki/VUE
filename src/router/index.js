import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import musicDis from '@/components/home/musicDis'
import myMusic from '@/components/myMusic'
import artList from '@/components/artList'
import resume from '../pages/resume'
import player from '../pages/player'
import singer from '../components/home/singer'
import cd from '../components/home/cd'
import mv from '../components/home/mv'


Vue.use(Router)

export default new Router({
 
  routes: [
    {path: '/', redirect: '/home'},//默认路由
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/home/musicDis',
      children:[
        
          {path: 'musicDis',name: 'musicDis', component: musicDis},       
        
                                 
        
          {path: 'singer', name: 'singer', component: singer},                         
        
          {path: 'cd',name: 'cd', component: cd  },                      
        
          {path: 'mv', name: 'mv',component: mv },                       
      ]
    },
    {path: 'player:id', name: 'player',component: player},   

    {
      path: '/myMusic',
      name: 'myMusic',
      component: myMusic
    },
    {
      path: '/artList',
      name: 'artList',
      component: artList
    },
    {
      path: '/resume',
      name: 'resume',
      component: resume
    },
  
  ]
})
