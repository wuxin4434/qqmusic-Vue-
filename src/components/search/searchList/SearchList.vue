<template>
    <div v-if="this.$store.state.searchList">
        <div v-for="item in searchList" class="searchWrapper" @click="toPlayMusic(item.songid,item.albumid,item.songmid)">
            <i class="el-icon-microphone"></i>
            <div class="singerBox">
                <div>{{item.songname}}</div>
                <div>{{item.singer[0].name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'searchList',
    computed:{
        input2(){
            return this.$store.state.input2
        },
        searchList(){
            return this.$store.state.searchList
        }
    },
    created(){
        this.$store.dispatch('getSearchSongList',this.input2,1)
    },



    methods:{
        toPlayMusic(songid,albumid,songmid){
            this.$store.dispatch('getmusicu',songid)
            // this.$store.commit('getsongmid',songmid)
            // this.$store.commit('changeSongId',id)
            // this.$store.commit('changealbumrid',albumid) 
            this.$router.push({name:'playMusic'});
        },
        
    }

}
</script>


<style>
    .searchWrapper{
        display: flex;
        padding: 10px 15px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        
    }
    .singerBox{
        font-size: 14px;
        display: inline-block;
        margin-left: 10px;
    }

    .singerBox div{
        white-space:nowrap;
    overflow: hidden;
       
    }
</style>