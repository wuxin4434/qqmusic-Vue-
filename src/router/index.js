import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import Recommend from '@/components/index/recommend/recommend'
import RankingList from '@/components/rankingList/RankingList'
import Search from '@/components/search/Search'
import HotList from '@/components/search/hotList/hotList'
import LocalList from '@/components/search/localStorage/localStorage'
import SearchList from '@/components/search/searchList/SearchList'
import PlayMusic from '@/components/playMusic/PlayMusic'
import TopSongPlay from '@/components/topSongPlay/topSongPlay'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path:'/',
      name: 'index',
      component: Index,
      redirect: '/recommend',
      children:[{
        path: 'recommend',
        name: 'recommend',
        component:Recommend
      },
      {
        path: '/rankingList',
        name: 'RankingList',
        component: RankingList
      },
      {
        path: '/search',
        name: 'search',
        redirect: '/search/hotList',
        component: Search,
        children:[{
          path: 'hotList',
          name: 'hotList',
          component: HotList,
        },
        {
          path: 'localList',
          name: 'localList',
          component: LocalList,
        },
        {
          path: 'searchList',
          name: 'searchList',
          component: SearchList,
        }]
      },
     ],
    },
    {
      path: 'playMusic',
      name: 'playMusic',
      component: PlayMusic,
    },
    {
      path: 'topSongPlay',
      name: 'topSongPlay',
      component: TopSongPlay,
    }
  ]
})
