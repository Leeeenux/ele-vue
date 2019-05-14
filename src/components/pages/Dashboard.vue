<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>当前课程</span>
          </div>
          <el-row>
            <el-table :data="course" border style="width: 100%">
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
          {{course.className}}
          {{course.weekday}}
          {{course.desc}}
          {{course.subject}}
          {{course.startTime}}
          {{course.endTime}}
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <a></a>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <a></a>
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
        course: [],
        swiper: [
          {
            src: 'http://wx3.sinaimg.cn/large/006haIIAly1g2e1k1nz8zj30p00an0w5.jpg'
          },
          {
            src: 'http://wx3.sinaimg.cn/large/006haIIAly1g2loaj2whhj30p00antck.jpg'
          }
        ]
      }

    },


    created: function () {
      
      Axios({
        method: "get",
        url: "/class/currentclass"
      })
        .then(res => {
          console.log(res.data)
          this.course.push(res.data)
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
</style>