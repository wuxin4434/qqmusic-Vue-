<template>
    <div>
       <Slider/>
       <SongStation/>
       <Me/>
    </div>
</template>

<script>

import Slider from '@/components/index/recommend/Slider'
import SongStation from '@/components/index/recommend/SongStation'
import Me from '@/components/index/recommend/Me'
import {mapState,mapMutations,mapActions} from 'vuex'

export default {
    name: 'recommend',
    components:{Slider,SongStation,Me},
    created(){
        this.$store.dispatch('getRecommend')
    }

}
</script>

<style>
    
</style>