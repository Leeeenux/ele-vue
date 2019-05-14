<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-row>
                        <el-button style="margin-left:20px;" @click='uploadClick' icon="el-icon-upload2" type="success">
                            批量导入</el-button>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-table :data="tableData" border style="width: 100%" size="mini">
                            <el-table-column type="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="teacherId" label="工号" width="180">
                            </el-table-column>
                            <el-table-column prop="teacherName" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="phone" label="手机号">
                            </el-table-column>
                            <el-table-column prop="duty" label="职称" width="180">
                            </el-table-column>
                            <el-table-column label="操作" width="120">
                                <template slot-scope="scope">

                                    <el-button @click="handleClick(scope.row)" icon="el-icon-edit" type="text"
                                        size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-button icon="el-icon-download" type="primary">导出本表</el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="text-align: center;">
            <div style="margin-top:20px;">
                <el-pagination background layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>
        </el-row>
        <TeacherInfoDialog :show.sync="show" :rowInfo="rowInfo"></TeacherInfoDialog>
        <TeacherUploadDialog :show.sync="uploadshow"></TeacherUploadDialog>
    </div>

</template>



<script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin';
    import TeacherInfoDialog from '@/components/common/TeacherInfoDialog'
    import TeacherUploadDialog from '@/components/common/TeacherUploadDialog'
    import XLSX from 'xlsx';
    export default {
        data() {
            return {
                noticeInfo: {
                    title: '',
                    content: '',
                    type: '',
                    classId: '101'
                },
                tableData: [{
                    studentId: '1507052316',
                    name: '王小虎',
                    duty: '团支书',
                    class: '15软件2班',
                    phone: '15985810086'
                }, {
                    studentId: '1507052316',
                    name: '王小虎',
                    duty: '上海',
                    city: '普陀区'
                }, {
                    studentId: '1',
                    name: '王小虎',
                    duty: '上海',
                    city: '普陀区'
                }],
                show: false,
                uploadshow: false,
                rowInfo: {}
            }

        },
        components: {
            TeacherInfoDialog,
            TeacherUploadDialog
        },
        created: function () {
            Axios({
                method: "get",
                url: "/teacher/list",
            })
                .then(res => {
                    this.tableData = res.data
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        watch: {
            show() {
                if (!this.show) {
                    this.reloadRecord()
                }
            }
        },
        methods: {
            uploadClick() {
                this.uploadshow = true;
            },
            handleClick(row) {
                this.show = true;
                this.rowInfo = row;
                console.log(row)
            },
            reloadRecord() {
                Axios({
                    method: "get",
                    url: "/teacher/list",
                })
                    .then(res => {
                        this.tableData = res.data
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        },

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