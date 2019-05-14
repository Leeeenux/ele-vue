<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{className}}</span>
          </div>
          <el-row>
              <el-table
              size="mini"
              :data="courses"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="subject"
                label="课程名称"
                width="250">
              </el-table-column>
              <el-table-column
                prop="weekday"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="节次">
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="结束时间">
              </el-table-column>
              <el-table-column
                prop="teacher"
                label="任课教师"
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
        userinfo:[],
        className:'',
        tableData: [{
          num: '1',
          name: 'C语言程序设计',
          address: '进入'
        }, {
          num: '2',
          name: 'C语言程序设计',
          address: '进入'
        }, {
          num: '3',
          name: 'C语言程序设计',
          address: '进入'
        }, {
          num: '4',
          name: 'C语言程序设计',
          address: '进入'
        }],
        courses:[]
      }

    },
    

    created: function () {
      Axios({
        method: "get",
        url: "/class/getclass"
      })
        .then(res => {
          console.log(res.data)
          this.courses = res.data.courses
          this.className = res.data.className.className
        })
        .catch(err => {
          console.log(err)
        })
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
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>