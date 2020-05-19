<template >
    <div id="searchInput">
        <div class="demo-input-suffix">
        <el-input
            v-if="show"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            @focus="gotolocalList"
            key="long"
            v-model="input2">
        </el-input>
        <el-input
            v-else
            key="short"
            class="short"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-on:keyup.enter.native="search"
            v-model="input2">
        </el-input>
        <span v-show="!show" @click="cancel">取消</span>
        </div>
    </div>
</template>

<script>

export default {
    name:'searchInput',

    data() {
        return {
        input2: '',
        show:true
        }
  },
    methods:{
        gotolocalList(){
               this.show = !this.show
               this.$router.push({name:'localList'})
        },
        cancel(){
            this.show = !this.show
            this.$router.push({name:'search'})
        },
        search(){
            this.$store.commit('changeInput2',this.input2)
            this.setStrage(this.input2)
            this.$router.push({name:'searchList'});
            
        },
        setStrage(data){
            if(window.localStorage.getItem('history') ===  null){
                console.log(0)
                var h2 = [];
                h2.push(data)
                var h = JSON.stringify(h2)
                window.localStorage.setItem('history',h)
            }else{
                console.log(1)
                var h3 =JSON.parse( window.localStorage.getItem('history'))
                console.log(typeof(h3),data)
                h3.push(data)
                var h4 = JSON.stringify(h3)
                window.localStorage.setItem('history',h4)
            }
        }
    }

}
</script>


<style >
    #searchInput{
        width: 100%;
        background-color:rgb(244,244,244);
        text-align: center;
    }



    span{
        display: inline-block;
        width: 10%;
        text-align: center;
    }
     .demo-input-suffix{
         padding: 10px;
     }

    .el-input{
        width: 95%;
    }

    .el-input.short{
        width: 85%;
    }
</style>