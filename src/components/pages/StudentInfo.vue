<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-row>
                        <el-select v-model="noticeInfo.classId" placeholder="请选择班级" @change="classIdChange">
                            <el-option label="15软件1班" value="101"></el-option>
                            <el-option label="15软件2班" value="102"></el-option>
                            <el-option label="15软件3班" value="103"></el-option>
                            <el-option label="15软件4班" value="104"></el-option>
                        </el-select>
                        <el-button style="margin-left:20px;" @click='uploadClick' icon="el-icon-upload2" type="success">
                            批量导入</el-button>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-table :data="tableData" border style="width: 100%" size="mini" id="table">
                            <el-table-column type="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="studentId" label="学号" width="180">
                            </el-table-column>
                            <el-table-column prop="studentName" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="phone" label="手机号" width="180">
                            </el-table-column>
                            <el-table-column prop="className" label="班级">
                            </el-table-column>
                            <el-table-column prop="duty" label="职务">
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
                classId:101,
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
            StudentInfoDialog,
            UploadDialog
        },
        created: function () {
            Axios({
                method: "get",
                url: "/student/list",
                params: {
                    classId: this.classId
                }
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
            },
            uploadshow(){
                if (!this.uploadshow) {
                    this.reloadRecord()
                }
            }
        },
        methods: {
            classIdChange(classId) {
                this.classId = classId
                Axios({
                    method: "get",
                    url: "/student/list",
                    params: {
                        classId: classId
                    }
                })
                    .then(res => {
                        this.tableData = res.data
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
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
                    url: "/student/list",
                    params: {
                        classId: this.classId
                    }
                })
                    .then(res => {
                        this.tableData = res.data
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            exportClick() {
                /* generate workbook object from table */
                var excelName = '学生信息' + '-' + this.classId + '-' + Date.parse(new Date());
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