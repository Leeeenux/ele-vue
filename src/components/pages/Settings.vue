<template>
    <div>
        <el-row :gutter="20">
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>我参与的课程</span>
              </div>
              <el-row>
                  <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="num"
                    label="序号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="class"
                    label="班级">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="操作"
                    width="120">
                  </el-table-column>
                </el-table>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>

</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin'
  export default {
    name: 'Header',
    data() {
      return {
        tableData: [{
          num: '1',
          name: 'C语言程序设计',
          class: '15软件工程2',
          handle: '移除'
        }]
      }

    },


    created: function () {
      // Axios({
      //   method: "get",
      //   url: "/user/info"
      // })
      //   .then(res => {
      //     console.log(res.data)
      //     this.data.userinfo = res.data
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    methods: {
      clicktest: function (event) {


      }

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

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>