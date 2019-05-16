<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-row>
                        <el-select v-model="classId" placeholder="请选择班级" @change="classIdChange">
                            <el-option label="15软件1班" value="101"></el-option>
                            <el-option label="15软件2班" value="102"></el-option>
                            <el-option label="15软件3班" value="103"></el-option>
                            <el-option label="15软件4班" value="104"></el-option>
                        </el-select>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-table :data="tableData" border style="width: 100%" size="mini" id="table">
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

                                    <el-button @click="agreeClick(scope.row)" icon="el-icon-success" type="text"
                                        size="small">通过</el-button>
                                    <el-button @click="disagreeClick(scope.row)" icon="el-icon-error" type="text"
                                        size="small">拒绝</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-button icon="el-icon-download" @click='exportClick' type="primary">导出本班级</el-button>
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
    </div>

</template>



<script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin';
    import XLSX from 'xlsx';
    import FileSaver from 'file-saver'
    export default {
        data() {
            return {
                classId: "101",
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
        },
        created: function () {
            Axios({
                method: "get",
                url: "/leave/listc",
                params: {
                    classId: 101
                }
            })
                .then(res => {
                    this.tableData = res.data.list
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            classIdChange(classId) {
                this.classId = classId
                Axios({
                    method: "get",
                    url: "/leave/listc",
                    params: {
                        classId: classId
                    }
                })
                    .then(res => {
                        this.tableData = res.data.list
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            agreeClick(row) {
                Axios({
                    method: "get",
                    url: "/leave/agree",
                    params: {
                        leaveId: row.leaveId
                    }
                })
                    .then(res => {
                        this.reloadRecord()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.log(row)
            },
            disagreeClick(row) {
                Axios({
                    method: "get",
                    url: "/leave/disagree",
                    params: {
                        leaveId: row.leaveId
                    }
                })
                    .then(res => {
                        this.reloadRecord()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            reloadRecord() {
                Axios({
                    method: "get",
                    url: "/leave/listc",
                    params: {
                        classId: this.classId
                    }
                })
                    .then(res => {
                        this.tableData = res.data.list
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            exportClick() {
                /* generate workbook object from table */
                var excelName = '班级请假记录' + '-' + this.classId + '-' + Date.parse(new Date());
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
</style>