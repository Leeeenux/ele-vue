<template>
  <div>
    <el-dialog :title="rowInfo.title" :visible.sync="visible" @close="$emit('update:show', false)" :show="show">
      {{rowInfo.createTime}}
      <div class="ql-editor" v-html="rowInfo.content"></div>
    </el-dialog>
  </div>
</template>

<script>
  import { Axios } from '@/plugins/AxiosPlugin';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  export default {
    name: 'NoticeDetailDialog',
    data() {
      return {
        visible: this.uploadshow,
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      rowInfo: {}
    },
    watch: {
      show() {
        var that = this
        this.visible = this.show;
      }
    },
    methods: {

    }
  };
</script>