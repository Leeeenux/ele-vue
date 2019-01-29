<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-card class="box-card">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>



<script>
    import bus from '@/components/bus';

    export default {
        name: 'Breadcrumb',
        data() {
            return {

            }

        },
        methods: {

        }

    };
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>