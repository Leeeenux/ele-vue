<template>
  <div class="wrapper">
    <Sidebar />
    <div class="content-box" :class="{'content-collapse':isCollapse}">
      <Header :username="name"/>
      <div class="content">
        <Breadcrumb />
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from '@/components/common/Header.vue'
  import Sidebar from '@/components/common/Sidebar.vue'
  import Breadcrumb from '@/components/common/Breadcrumb.vue'//面包屑
  import bus from '@/components/bus'
  import { Axios } from '@/plugins/AxiosPlugin'

  export default {
    name: 'home',
    data() {
      return {
        isCollapse: false,
        tagsList: [],
        name:''
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

      Axios({
        method: "get",
        url: "/user/info"
      })
        .then(res => {
          console.log(res.data.userinfo)
          this.name = res.data.userinfo.name
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>