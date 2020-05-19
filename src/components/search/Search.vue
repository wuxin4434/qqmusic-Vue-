<template>
    <div>
        <searchInput/>
        <router-view></router-view>
    </div>
</template>


<script>

import searchInput from '@/components/search/searchInput/searchInput'

export default {
    name:'Search',
    components:{searchInput},
    created(){
         this.$store.dispatch('getHotList')
    }
}
</script>



<style>
    
</style>