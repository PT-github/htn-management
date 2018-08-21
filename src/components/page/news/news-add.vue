<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻标题">
          <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类">
          <el-select v-model="form.cate" placeholder="请选择">
              <el-option label="工作动态" value="1"></el-option>
              <el-option label="通知公告" value="2"></el-option>
              <el-option label="行业资讯" value="3"></el-option>
              <el-option label="政策法规" value="4"></el-option>
              <el-option label="培训风采" value="5"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          class="upload-demo"
          action="/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态">
          <el-radio-group v-model="form.status">
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">发布</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
          <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">表单提交</el-button>
          <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { addNews } from "@/api/service";
export default {
  name: "newsAdd",
  data() {
    return {
      editorOption: {
        placeholder: "文章内容"
      },

      form: {
        name: "",
        cate: "1",
        status: 0,
        coverMap: "",
        content: ""
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      addNews(this.form)
        .then(response => {
          console.log(this.form, response)
          loading.close();
          if (response.success) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "新增失败",
              type: "error"
            });
          }
        })
        .catch(error => {
          loading.close();
        });
    },
    handleRemove() {},
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      const isJPG = file.type.indexOf("image") !== -1; //=== "image/jpeg" || ;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return isJPG && isLt2M;
    },
    uploadSuccess(response, file, fileList) {
      this.form.coverMap = response.data.url;
      this.fileList.splice(0, this.fileList.length);
      this.fileList.push({
        name: file.name,
        url: response.data.url
      });
    }
  },
  components: {
    quillEditor
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.ql-toolbar.ql-snow {
  line-height: initial;
}
</style>


