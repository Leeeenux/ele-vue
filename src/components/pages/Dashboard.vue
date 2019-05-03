<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-carousel :interval="4000" type="card" height="250px">
          <el-carousel-item>
            <el-row>
              <el-col :span="24">
                <img style="width:100%;" ref="imgHeight"
                  src="http://wx3.sinaimg.cn/large/006haIIAly1g2e1k1nz8zj30p00an0w5.jpg" class="banner_img" />
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row>
              <el-col :span="24">
                <img style="width:100%;" ref="imgHeight"
                  src="http://wx4.sinaimg.cn/large/006haIIAly1g2loajbg2aj30p00an44u.jpg" class="banner_img" />
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row>
              <el-col :span="24">
                <img style="width:100%;" ref="imgHeight"
                  src="http://wx3.sinaimg.cn/large/006haIIAly1g2loaj2whhj30p00antck.jpg" class="banner_img" />
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>