<template>
  <div class="sidebar">
    <el-menu default-active="onRoutes" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened
      router>
      <!-- unique-opened router -->
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-menu-item index="/" v-if="role == 'student'">
        <i class="iconfont icon-shujukanban" v-if="role == 'student'"></i>
        <span slot="title">我的面板</span>
      </el-menu-item>
      <el-menu-item index="class" v-if="role == 'student'">
        <i class="iconfont icon-peiwangyindao" ></i>
        <span slot="title">我参与的课程</span>
      </el-menu-item>
      <!-- <el-menu-item index="student" v-if="role == 'teacher'">
        <i class="iconfont icon-icon_zhanghao"></i>
        <span slot="title">学生管理</span>
      </el-menu-item> -->
      <el-menu-item index="AttendanceManage" v-if="role == 'teacher'">
        <i class="iconfont icon-biaodanzujian-biaoge2"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>
      <el-menu-item index="MyAttendance" v-if="role == 'student'">
        <i class="iconfont icon-biaodanzujian-biaoge2"></i>
        <span slot="title">我的签到</span>
      </el-menu-item>
      <el-submenu index="0" v-if="role == 'teacher'">
          <template slot="title">
            <i class="iconfont icon-quanxianshenpi"></i>
            <span slot="title">人员管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">人员管理</span>
            <el-menu-item index="studentInfo" v-if="role == 'teacher'">学生管理</el-menu-item>
            <el-menu-item index="teacherInfo" v-if="role == 'admin'">教师管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      <el-menu-item index="noticerecord" v-if="role == 'student'">
          <i class="iconfont icon-biaodanzujian-biaoge2"></i>
          <span slot="title">查看通知</span>
      </el-menu-item>
      <el-submenu index="1" v-if="role == 'teacher'">
        <template slot="title">
          <i class="iconfont icon-xiaoxitongzhi"></i>
          <span slot="title">通知</span>
        </template>
        <el-menu-item-group>
          <span slot="title">通知</span>
          <el-menu-item index="editor" v-if="role == 'teacher'">通知编辑器</el-menu-item>
          <el-menu-item index="noticerecord" v-if="role == 'teacher'" >管理通知</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-renwujincheng"></i>
          <span slot="title">请假</span>
        </template>
        <el-menu-item-group>
          <span slot="title">请假</span>
          <el-menu-item index="leave" v-if="role == 'student'">请假申请</el-menu-item>
          <el-menu-item index="leaverecord"  v-if="role == 'student'">请假记录</el-menu-item>
          <el-menu-item index="leavemanage"  v-if="role == 'teacher'">请假管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="settings">
        <i class="iconfont icon-icon_shezhi"></i>
        <span slot="title">设置</span>
      </el-menu-item>

    </el-menu>
    <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="leave">请假申请</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
    </el-menu> -->
  </div>
</template>



<style>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar>ul {
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .iconfont {
    width: 24px;
    margin-right: 5px;
  }

  .el-menu {
    border-right: none;
  }
</style>

<script>
  import bus from '@/components/bus';

  export default {
    name: "Sidebar",
    data() {
      return {
        isCollapse: false
      };
    },
    props: ['role'],
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('isCollapse', msg => {
        this.isCollapse = msg;
      })
    }
  };
</script>