<template>
  <div>
      <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="8">
            <el-card>ss</el-card>
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
  </div>
</template>

<script>
  import backImg from '@/assets/back.jpg'

  export default {
    data() {
      return {
        isCollapse: false,
        tagsList: []
      }
    },
    components: {
      Header,
      Sidebar,
      Breadcrumb
    },
    created() {
      bus.$on('isCollapse', msg => {
        this.isCollapse = msg;
      })
    }
  }
</script>

<style>
  body{
    background-image: url(backImg)
  }
</style>