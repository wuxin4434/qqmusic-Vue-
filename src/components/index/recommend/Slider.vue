<template>
  <div class="block">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in imgList" :key="item.picUrl">
        <img :src="item.picUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>

import {mapState} from 'vuex'

export default {
    name: 'slider',
    computed:{
      ...mapState({
        imgList(state){
          return state.recommendData.slider
        }
      })
    },
}
</script>


<style scoped>
  .el-carousel__item{
    padding: 0;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>