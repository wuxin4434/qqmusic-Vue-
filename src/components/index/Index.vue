<template>
    <div>
        <el-container>
            <el-header height="90px" >
                <Hider />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>  
    </div>
</template>

<script>
import Hider from '@/components/index/Header/Header'

export default {
    name: 'index',
    components:{Hider},
}
</script>

<style>
  .el-header, .el-footer {
    padding: 0;
    color: #333;
  }
  
  
  .el-main {
    padding: 0;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>