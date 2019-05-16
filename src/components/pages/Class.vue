<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-weight:bold;">最新通知</span>
          </div>
          <el-collapse v-model="activeName" accordion>
              <el-collapse-item v-for='item in notices' :title="item.title" :name="item.noticeId">
                <div v-html="item.content"></div>
              </el-collapse-item>
          </el-collapse>
         
        </el-card>
      </el-col>

    </el-row>
    <el-row style="margin-top:20px;">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight:bold;">我的课表</span>
          </div>
          <el-row>
            <el-table size="mini" :data="courses" border style="width: 100%">
              <el-table-column type="index" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="subject" label="课程名称" width="250">
              </el-table-column>
              <el-table-column prop="weekday" label="日期">
              </el-table-column>
              <el-table-column prop="desc" label="节次">
              </el-table-column>
              <el-table-column prop="startTime" label="开始时间">
              </el-table-column>
              <el-table-column prop="endTime" label="结束时间">
              </el-table-column>
              <el-table-column prop="teacher" label="任课教师" width="120">
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
        activeName: '1',
        userinfo: [],
        className: '',
        notices: [],
        courses: []
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
      this.getNotice()
    },
    methods: {
      getNotice() {
        Axios({
          method: "get",
          url: "/notice/list"
        })
          .then(res => {
            console.log(res.data)
            this.notices = res.data.list
          })
          .catch(err => {
            console.log(err)
          })
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