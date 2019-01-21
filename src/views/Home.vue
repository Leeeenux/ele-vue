<template>
  <div class="wrapper">
    <Header />
    <Sidebar />

    <div class="content-box" :class="{'content-collapse':isCollapse}">
      <div class="content">
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

  export default {
    name: 'home',
    data() {
      return {
        isCollapse: false,
        tagsList: []
      }
    },
    components: {
      Header,
      Sidebar
    },
    created() {
      bus.$on('isCollapse', msg => {
        this.isCollapse = msg;
      })
    }
  }
</script>