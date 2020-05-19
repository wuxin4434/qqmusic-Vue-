<template>
    <div id="hider">
        <div class="imgBox">
            <img :src='imgSrc' alt="">
        </div>
        <div class="spanList">
            <router-link tag="div" :to="linkUrl[i]" v-for="(item,i) in spanList" :key="item" exact>{{item}}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hider',
    data(){
        return {
            imgSrc: '//y.gtimg.cn/mediastyle/yqq/img/logo.png?nowebp=1',
            spanList: ['推荐', '排行榜', '搜索'],
            index:0,
            linkUrl:['/recommend','/rankingList','/search/hotList']
        }
    },
}
</script>


<style>
    #hider .imgBox{
        font-size: 0;
        padding: 10px;
        background-color: #31c27c;
    }

    #hider img{
        height: 30px;
    }

    .spanList{
        display: flex;
      
        justify-content: space-around;
        line-height: 40px;
    }

    .spanList div{
        position: relative;
        width: 33.3%;
        text-align: center;
    }

    .spanList div.router-link-active::after{
        display: block;
        position: absolute;
        content: '';
        height: 2px;
        width: 100%;
        background-color: #31c27c;  
        bottom: 0;
        left: 0;
    }
    
</style>


