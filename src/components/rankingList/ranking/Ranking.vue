<template>
    <div>
        <ul class="demo">
            <li v-for="(item,index) in topList" @click="goTop(topList[index].id)">
                <img :src="item.picUrl" alt="">
                <div>
                    <p>{{item.topTitle}}</p>
                    <p v-for=" (i,index)  in item.songList">{{++index}} {{i.songname}}-{{i.singername}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ranking',
    computed:{
        topList(){
            return this.$store.state.rankingList.topList
        }
    },
    methods:{
        // search(data){
        //     // this.$store.dispatch('getToplist',data);
        //     // this.$router.push({name:'topSongPlay'})
        // },
        goTop(id){
           this.$router.push({name:'topSongPlay',params:{id:id}})
        }
    }
}
</script>


<style>
    .demo{
        width: 100%;
    }
    .demo li{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        white-space: nowrap;
        height:150px;
        padding: 10px;
    }

    .demo li img{
        width: 35%;
    }

    .demo li div{
        text-indent: 1em;
        width: 65%;
        overflow: hidden;
        float: right;
        height: 150px;
    }
    .demo li div p{
        height: 20%;
    }
</style>