<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <el-row style="margin-top:20px;">
            <el-table :data="tableData" border style="width: 100%" size="mini">
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="title" label="通知标题" width="180">
              </el-table-column>
              <el-table-column prop="type" label="通知类型" width="180">
              </el-table-column>
              <el-table-column prop="className" label="通知对象" width="180">
              </el-table-column>
              <el-table-column prop="content" label="内容">
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间">
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="deleteClick(scope.row)" icon="el-icon-delete" type="text" size="small">删除
                  </el-button>
                  <el-button @click="editClick(scope.row)" icon="el-icon-edit" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
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
    <EditorDialog :show.sync="show" :rowInfo="rowInfo"></EditorDialog>
  </div>

</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin'
  import EditorDialog from '@/components/common/EditorDialog'
  export default {
    data() {
      return {
        tableData: [{
          title: 'title',
          type: 'type',
          content: 'content',
          createTime: '2019'
        }],
        show: false,
        rowInfo: {}
      }

    },
    components: {
      EditorDialog
    },
    created: function () {
      Axios({
        method: "get",
        url: "/notice/list"
      })
        .then(res => {
          console.log(res.data)
          this.tableData = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    activated() {
      console.log("页面重载")
      Axios({
        method: "get",
        url: "/notice/list"
      })
        .then(res => {
          console.log(res.data)
          this.tableData = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      editClick(row) {
        this.show = true;
        this.rowInfo = row;
      },
      deleteClick(row) {
        var noticeId = row.noticeId
        Axios({
          method: "get",
          url: "/notice/delete",
          params: {
            noticeId: noticeId
          }
        })
          .then(res => {
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