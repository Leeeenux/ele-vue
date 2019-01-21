<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
</template>



<script>
    import bus from '@/components/bus';

    export default {
        name: 'Breadcrumb',
        data() {
            return {
                isCollapse: false
            }

        },
        methods: {
            // 侧边栏折叠
            collapseChage() {
                this.isCollapse = !this.isCollapse;
                console.log(this.isCollapse)
                bus.$emit('isCollapse', this.isCollapse);//bus.$emit用来实现组件之间的通信，待研究
            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        }
    };
</script>

<style scoped>
</style>