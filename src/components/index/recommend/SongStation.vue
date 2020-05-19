<template>
    <div id="stationWrapper" >
      <div class="title">{{title}}</div>
      <div class="radioStation">
        <div v-for="item in radioList" class="radioItem" @click="search(item.radioid)">
            <img :src="item.picUrl" alt="">
            <div>{{item.Ftitle}}</div>
        </div>
      </div>  
    </div>
    
</template>

<script>

import Vuex, { mapActions } from 'vuex'
let {mapState} = Vuex

export default {
    name: 'songStation',
    data(){
        return {
            title:'电台'
        }
    },
    computed: {
        ...mapState({
            radioList(state){
                return state.recommendData.radioList
            }
        })
    },
}
</script>


<style>


    #stationWrapper{
        background-color: #eee;
    }
    .title{
        height: 40px;
        line-height: 40px;
        width: 96%;
        margin: 0 auto;
    }

    .radioStation{
        display: flex;
        justify-content:space-around;
        padding-bottom: 20px;
      
    }
    .radioItem{
          background-color: #fff;
          width: 46%;
    }

    .radioStation div img {
        width: 100%;
    }


</style>