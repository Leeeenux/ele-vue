<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <h1>sada</h1>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <h1>sada</h1>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <h1>sada</h1>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <h1>sada</h1>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <h1>sada</h1>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <h1>sada</h1>
        </el-card>
      </el-col>
    </el-row>
  </div>


</template>



<script>
  import bus from '@/components/bus';

  export default {
    name: 'Header',
    data() {
      return {

      }

    },
    methods: {

    }
  };
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>