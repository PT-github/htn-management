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
          :file-list="fileList"
          :limit=1
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
          <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
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
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "newsAdd",
  data() {
    return {
      content: "",
      html: "",
      configs: {},

      form: {
        name: "",
        cate: "1",
        status: 0,
        coverMap: "",
        name: ""
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    submit() {
      console.log(this.content);
      console.log(this.html);
      this.$message.success("提交成功！");
    },

    onSubmit() {},
    handleRemove() {},
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, "===");
      this.form.coverMap = response.data.url;
      this.fileList.splice(0, this.fileList.length);
      this.fileList.push({
        name: file.name,
        url: response.data.url
      });
    }
  },
  components: {
    mavonEditor
  }
};
</script>

