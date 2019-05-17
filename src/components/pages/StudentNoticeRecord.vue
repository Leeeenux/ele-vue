<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <el-row style="margin-top:20px;">
            <el-table :data="tableData" border style="width: 100%" size="mini">
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="title" label="通知标题">
              </el-table-column>
              <el-table-column prop="type" label="通知类型" width="180">
              </el-table-column>
              <el-table-column prop="className" label="通知对象" width="180">
              </el-table-column>
              <el-table-column prop="content" label="内容" v-if='false'>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="180">
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="DetailClick(scope.row)" icon="el-icon-search" type="text" size="small">通知详情
                  </el-button>
                  
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
    <NoticeDetailDialog :show.sync="show" :rowInfo="rowInfo"></NoticeDetailDialog>
  </div>

</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin'
  import NoticeDetailDialog from '@/components/common/NoticeDetailDialog'
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
      NoticeDetailDialog
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
      this.reloadRecord()
    },
    watch: {
      show(){
        if(!this.show){
          this.reloadRecord()
        }
      }
    },
    methods: {
      editClick(row) {
        this.show = true;
        this.rowInfo = row;
      },
      DetailClick(row) {
        var noticeId = row.noticeId
        console.log(row)
        this.show = true;
        this.rowInfo = row;
      },
      reloadRecord(){
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
      }
    }
  };
</script>

<style scoped>
</style>