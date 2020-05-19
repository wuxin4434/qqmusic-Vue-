<template>
  <div class="demo" v-if="musicInfo.data != undefined && audioUrl != undefined &&singerAblum.data != undefined">
   
    <div class="albumBox" >
      <h3 class="title">{{musicInfo.data.detail.data.track_info.title}}</h3>
      <div class="a">{{musicInfo.data.detail.data.track_info.singer[0].name}}</div>
      <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+musicInfo.data.detail.data.track_info.album.mid+'.jpg?max_age=2592000'" class="img" alt />
      <div class="lyric"></div>
      <div>查看完整歌词</div>
      <div class="iconBox">
        <i class="el-icon-video-pause" @click="change" v-show="show"></i>
        <i class="el-icon-video-play" @click="change" v-show="!show"></i>
        <i class="el-icon-star-off"></i>
      </div>
      <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+musicInfo.data.detail.data.track_info.album.mid+'.jpg?max_age=2592000'" alt class="blur" />
      <audio :src="audioUrl == 'undefined' ?  '' : audioUrl"
            autoplay
            loop
            ref="myAudio"
    ></audio>
    </div>
     <div class="main" v-if="musicInfo">
         <el-button type="success"  class="load">点击下载</el-button>
         <h3 class="guss">猜你喜欢听</h3>
         <div class="rMusic" v-for="item in musicInfo.data.simsongs.data.songInfoList">
            <img class="cnxh_img" :src="'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+item.album.mid+'.jpg?max_age=2592000'" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <span>{{item.singer[0].name}}</span>
            </div>
         </div>
         
    </div>

    <div  class="listenr">
        <h3 class="guss">大家都在听</h3>
        <div class="box">
          <div v-for="item in musicInfo.data.gedan.data.vec_gedan"s class="listening">
            <img :src="item.imgurl" alt="">
            <p>{{item.dissname}}</p>
            <p>{{item.creator}}</p>
        </div>
        </div>
    </div>

    <div class="singerAblum">
        <h3>歌手与专辑</h3>
        <div>
          <div class="singer">
            <img class="cnxh_img" :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+singerAblum.data.data.singermid+'.jpg?max_age=2592000'" alt="">
            <span>歌手</span>
            <span>{{singerAblum.data.data.singername}}</span>
          </div>
          <div class="ablum">
            <img class="cnxh_img" :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+singerAblum.data.data.mid+'.jpg?max_age=2592000'" alt="">
            <span>专辑:</span>
            <span>{{singerAblum.data.data.name}}</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playMusic",
  data(){
    return {
      show:true,
    }
  },
  mounted(){
    console.log('mounted')
  },

  computed: {

    musicInfo(){
        
        return this.$store.state.musicInfo 
    },


    audioUrl(){
        return `http://dl.stream.qqmusic.qq.com/${this.$store.state.purl}`
    },

    singerAblum(){
      return this.$store.state.otherAlbum
    }
    
  },
  created() {
    
  },
  mounted(){
    console.log(this.musicInfo,131321)
  },


  methods:{
    change(){
      let audio = this.$refs.myAudio
      if(!audio.paused){
        this.show = !this.show
        audio.pause()
      }else{
        this.show = !this.show
        audio.play()
      }
    }
  }
};
</script>


<style >
.albumBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100vw;
  background: rgba(255, 255, 255, 0.6);
}


.albumBox .blur {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  -webkit-filter: blur(10px); /* Chrome, Opera */
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(5px);
}



.albumBox .img {
  width: 60%;
}

.albumBox .title {
  font-weight: 500;
  text-align: center;
}
.albumBox .lyric {
  display: none;
  width: 50%;
  height: 50%;
}

.albumBox .iconBox {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}

.el-icon-video-pause,
.el-icon-video-play,
.el-icon-star-off {
  font-size: 35px;
  padding: 0 15px;
}

.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px;

}

.main .load{
    text-align: center;
    background-color: #31c27c;
    padding:14px 70px;
    border-radius: 30px;
}

.load span{
    width: auto;
}


.rMusic{
    font-size: 0;
    display: flex;
    width: 100%;
    justify-items: left;
    border-bottom: 1px solid rgb(240,240,240);
}

.guss{
    padding: 20px;
    font-weight: 500;
}
.rMusic img{
    width: 18%;
    height: 18%;
}
.rMusic .info{
    font-size: 14px;
    margin-left: 10px;
   display: flex;
   flex-direction: column;
   align-items:flex-start;
   justify-content: center;
}
.rMusic .info span{
    width: auto;
}

.listenr{
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.listenr h3{
  text-align: center;
}
.listenr .box{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.listenr .box .listening{
  width: 32%;
}
.listenr .listening img{
  width: 100%;
}

.listenr .box .listening p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.singerAblum h3{
  font-weight: 500;
  text-align: center;
  padding: 40px;
}

.singerAblum{
  padding: 10px;
}

.singerAblum span{
  width: auto;
}

.singerAblum .singer,.singerAblum .album{
  border-bottom: 1px solid #ccc;
}

.singerAblum  img{
  width: 18%;
  vertical-align: top;
}
</style>