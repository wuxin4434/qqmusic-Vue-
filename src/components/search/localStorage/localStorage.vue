<template>
    <div>
        <p v-for="item in this.items" class="p">
            <i class="el-icon-time"></i>{{item}}
            <i class="el-icon-close" @click="removeItem(item)"></i>
        </p>
    </div>
</template>

<script>

Array.prototype.remove = function(val) {
var index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};
export default {
    name:'localStrange',
    computed: {
        items(){
            return this.unique(JSON.parse(window.localStorage.getItem('history'))).reverse().splice(0,4)
        }
    },
    methods:{
        removeItem(item){
            var data = JSON.parse (window.localStorage.getItem('history'));
            console.log(data)
            data.remove(item)
            window.localStorage.setItem('history',JSON.stringify(data))
             this.items = JSON.parse (window.localStorage.getItem('history'))
        },
        unique (arr) {
            return Array.from(new Set(arr))
        }
    }
}
</script>

<style>
    .p{
        padding: 15px 25px;
        border-bottom: 1px solid #ccc;
    }
    .p .el-icon-time{
        margin-right: 10px;
    }
    .el-icon-close{
        float: right;
    }
</style>