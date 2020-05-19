<template >
  <div v-if="topList.data != '' &&  topList.data !=undefined">
    <div class="songInfo">
      <div class="box">
       <img class="infoImg" :src="topList.data.topinfo.pic_v12" alt />
        <audio :src="audioUrl" autoplay loop ref="audio"></audio>
        <div class="info">
           <h3>{{topList.data.topinfo.ListName}}</h3>
          <div>
            <div>第{{topList.data.day_of_year}}天</div>
            <div>{{topList.data.update_time}}更新</div>
          </div>
        </div>
      </div>
      <div class="controlBox">
        <div @click="controlAudio">播放全部</div>
      </div>
    </div>
    <div class="songList">
      <span class="title">排行榜 共{{topList.data.total_song_num}}首</span>
      <ul>
        <li v-for="(item,index) in topList.data.songlist.slice(0,10)">
            <span >{{++index}}</span>
            <div class="content">
                <div>{{item.data.songname}}</div>
                <div>
                    <div v-for="i in item.data.singer">{{i.name}}.</div>
                </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "topSongPlay",
  computed: {
    topList() {
      return this.$store.state.topList;
    },
    audioUrl(){
        if(this.$store.state.purl != 'undefined'){
          return `http://dl.stream.qqmusic.qq.com/${this.$store.state.purl}`
        }
        
    },
    
  },
  created(){
    this.$store.dispatch('getToplist',this.$route.params.id)
    this.$store.dispatch('getaudiovkey',this.topList.data.songlist[0].data.songmid)
  },
  methods:{
    controlAudio(){
      if(!this.$refs.audio.paused){
        this.$refs.audio.pause()
      }else{
        this.$refs.audio.play()
      }
    }
  }
};
</script>

<style>
.songInfo {
    color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 80vw;
  background-color:rgba(0, 0,0, 0.8);
}

.songInfo .box{
    margin-top: 10%;
    display: flex;
    justify-content: center;
}

.songInfo .infoImg {
  width: 33%;
  height: 33vw;
  margin-right: 20px;
}

.songInfo .info {
  display:flex;
  height: 33vw;
  flex-direction: column;
  justify-content: space-between;

}

.info h3{
    font-weight: 500;
}

.controlBox{
    text-align: center;
}
.controlBox div{
    display: inline-block;
    padding: 3% 15%;
    border-radius: 40px;
    background-color: #31c27c;
}

.songList{
    padding: 3%;
}

.songList li{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}

.songList li>div{
    display: inline-block;
}

.songList li>div div{
    display: inline-block;
    
}

.songList .title{
     font-size: 18px;
     height: 100%;
     line-height: 100%;
}

.songList ul li{
    display: flex;
    padding: 10px 0;
    align-items: center;
    border-bottom: 1px solid #ccc;
}

.songList ul li:nth-of-type(1)>span,

.songList ul li:nth-of-type(2)>span,

.songList ul li:nth-of-type(3)>span{
    color: red;
}

.songList ul li>span{
    margin-right: 5px;
}

.songList ul li .content{
    display: flex;
    padding: 5px;
    flex-direction: column;
}



</style>