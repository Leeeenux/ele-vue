<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-row style="margin-top:20px;">
                        <el-table :data="tableData" border style="width: 100%" size="mini">
                            <el-table-column type="index" label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="studentName" label="姓名" width="80">
                            </el-table-column>
                            <el-table-column prop="leaveId" label="请假的ID" width="80" v-if='false'>//这一列隐藏
                            </el-table-column>
                            <el-table-column prop="className" label="班级" width="80">
                            </el-table-column>
                            <el-table-column prop="content" label="请假理由">
                            </el-table-column>
                            <el-table-column prop="startTime" label="开始时间" width="180">
                            </el-table-column>
                            <el-table-column prop="endTime" label="结束时间" width="180">
                            </el-table-column>
                            <el-table-column prop="type" label="请假类型" width="80">
                            </el-table-column>
                            <el-table-column prop="status" label="状态" width="80">
                            </el-table-column>
                            <el-table-column label="操作" width="120">
                                <template slot-scope="scope">

                                    <el-button @click="editClick(scope.row)" icon="el-icon-edit" type="text"
                                        size="small">编辑</el-button>
                                    <el-button @click="deleteClick(scope.row)" icon="el-icon-delete" type="text"
                                        size="small">删除</el-button>
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
        <LeaveInfoDialog :show.sync="show" :rowInfo="rowInfo"></LeaveInfoDialog>
    </div>

</template>



<script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin';
    import LeaveInfoDialog from '@/components/common/LeaveInfoDialog'
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
            LeaveInfoDialog
        },
        created: function () {
            Axios({
                method: "get",
                url: "/leave/list",
            })
                .then(res => {
                    this.tableData = res.data.list
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        activated() {
            this.reloadRecord()
        },
        watch: {
            show() {
                if (!this.show) {
                    this.reloadRecord()
                }
            }
        },
        methods: {
            classIdChange(classId) {
                Axios({
                    method: "get",
                    url: "/leave/list"
                })
                    .then(res => {
                        this.tableData = res.data.list
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            editClick(row) {
                if (row.status == "未审核") {
                    this.show = true;
                    this.rowInfo = row;
                } else {
                    this.$message({
                        message: '已审核不可以编辑',
                        type: 'warning'
                    });

                }

            },
            deleteClick(row) {
                var leaveId = row.leaveId
                Axios({
                    method: "get",
                    url: "/leave/delete",
                    params: {
                        leaveId: leaveId
                    }
                })
                    .then(res => {
                        this.reloadRecord();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            reloadRecord() {
                console.log("重载")
                Axios({
                    method: "get",
                    url: "/leave/list"
                })
                    .then(res => {
                        this.tableData = res.data.list
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
    };
</script>

<style scoped>
</style>