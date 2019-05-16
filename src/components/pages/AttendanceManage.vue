<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-row>
                        <el-col :span="5">
                            <el-select v-model="classId" placeholder="请选择班级" @change="classIdChange">
                                <el-option label="15软件1班" value="101"></el-option>
                                <el-option label="15软件2班" value="102"></el-option>
                                <el-option label="15软件3班" value="103"></el-option>
                                <el-option label="15软件4班" value="104"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-date-picker v-model="queryDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                @change='dateChange'>
                            </el-date-picker>

                        </el-col>
                        <el-col :span="5">
                            <el-select v-model="subjectId" placeholder="请选择课程" @change="subjectChange">
                                <div v-for="item in subjects">
                                    <el-option :label="item.subjectName" :value="item.subjectId"></el-option>
                                </div>

                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-button @click='queryClick' icon="el-icon-search" type="success">
                                查询</el-button>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-table :data="tableData" border style="width: 100%" size="mini" id='table'>
                            <el-table-column type="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="studentName" label="姓名">
                            </el-table-column>
                            <el-table-column prop="studentId" label="学号">
                            </el-table-column>
                            <el-table-column prop="weekday" label="日期" width="80">
                            </el-table-column>
                            <el-table-column prop="createTime" label="开课时间">
                            </el-table-column>
                            <el-table-column prop="arrangeDesc" label="节次">
                            </el-table-column>
                            <el-table-column prop="subjectName" label="课程">
                            </el-table-column>
                            <el-table-column prop="signInTime" label="签到时间">
                            </el-table-column>
                            <el-table-column prop="signInStatus" label="签到状态" width="80">
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-button icon="el-icon-download" @click='exportClick' type="primary">导出本表</el-button>
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
        <StudentInfoDialog :show.sync="show" :rowInfo="rowInfo"></StudentInfoDialog>
        <UploadDialog :show.sync="uploadshow"></UploadDialog>
    </div>

</template>



<script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin';
    import StudentInfoDialog from '@/components/common/StudentInfoDialog'
    import UploadDialog from '@/components/common/UploadDialog'
    import XLSX from 'xlsx';
    import FileSaver from 'file-saver'
    export default {
        data() {
            return {
                subjectId: '',
                queryDate: '',
                classId: '',
                tableData: [{
                }],
                subjects: [],
                show: false,
                uploadshow: false,
                rowInfo: {}
            }

        },
        components: {
            StudentInfoDialog,
            UploadDialog
        },
        created: function () {
        },
        watch: {
        },
        methods: {
            queryClick() {
                Axios({
                    method: "get",
                    url: "/teacher/atdlist",
                    params: {
                        classId: this.classId,
                        date: this.queryDate,
                        subjectId: this.subjectId
                    }
                })
                    .then(res => {
                        this.tableData = res.data.list
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            dateChange(date) {
                this.subjects = [{}]
                Axios({
                    method: "get",
                    url: "/teacher/subjects",
                    params: {
                        classId: this.classId,
                        date: this.queryDate
                    }
                })
                    .then(res => {
                        this.subjects = res.data.list
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            exportClick() {
                /* generate workbook object from table */
                var excelName = '考勤记录' + this.subjectId + '-' + this.classId + '-' + Date.parse(new Date());
                var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excelName + '.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
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