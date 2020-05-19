<template>
    <div id="hotList">
        <div class="title">{{title}}</div>
        <div class="itemWrapper">
            <ul>
                <li class="special_key" @click="search(hotList.special_key)">{{hotList.special_key}}</li>
                <li v-for="item in hotList.hotkey" class="item" @click="search(item.k)">{{item.k}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: 'hotList',
    data(){
        return {
            title:'热门搜索'
        }
    },
    methods:{
        search(item){
            this.$store.dispatch('getSearchSongList',item,1).then(()=>{
                this.$router.push({name:'searchList'})
            })
            
        }
    },
    computed:{
        hotList(){
            return this.$store.state.hotList
        }
    },

}
</script>


<style>
    *{
        list-style: none;
    }
    #hotList{
        box-sizing: border-box;
        padding: 15px;
        width: 100%;
        

    }

    .itemWrapper{
        width: 100%;
    }

    .itemWrapper li{
        display: inline-block;
        padding: 10px 10px;
        border: 1px solid black;
        border-radius: 20px;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 14px;
    }
    
    .itemWrapper .special_key{
        border-color: red;
        color: red;
    }

</style>