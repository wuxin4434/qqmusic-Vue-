<template>
    <div>
        <Ranking/>
    </div>
</template>

<script>

import {mapActions} from 'vuex'
import Ranking from '@/components/rankingList/ranking/Ranking'

export default {
    name: 'rankingList',
    components:{Ranking},
    methods:{
    },
    created(){
        this.$store.dispatch('getRankingList')
    }
    
}
</script>


<style>
    
</style>