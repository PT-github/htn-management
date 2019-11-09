<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="课程名称">
          <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="课程分类">
          <el-select v-model="form.cate" placeholder="请选择">
            <el-option v-for="(item, index) in options" :key="'cate_lesson-' + index" :label="item.name" :value="item.id + ''"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          class="upload-demo"
          action="http://www.hnjkrcw.com/admin/upload"
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
      <el-form-item label="课时">
          <el-input v-model="form.classHour"></el-input>
      </el-form-item>
      <el-form-item label="培训费">
          <el-input v-model="form.trainingFee"></el-input>
      </el-form-item>
      <el-form-item label="考试及资料费">
          <el-input v-model="form.examInforFee"></el-input>
      </el-form-item>
      <el-form-item label="课程详情">
          <!--<quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>-->
          <Ueditor :value="content" :config="config" ref="ue"></Ueditor>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
    import Ueditor from '@/components/common/Ueditor.vue';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { modifyLessons } from "@/api/service";
export default {
  name: "lessonAdd",
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    // if (this.$route.query.id) {
    //   this.getNewsDetail(this.$route.query.id)
    // }
  },
  data() {
    return {
        content: '',
        config: {
            initialFrameWidth: null,
            initialFrameHeight: 400
        },
      editorOption: {
        placeholder: "课程详情"
      },
      form: {
        id: "",
        name: "",
        cate: "",
        startTime: "",
        endTime: "",
        imgUrl: "",
        classHour: "",
        trainingFee: "",
        examInforFee: "",
        content: "",
          priority: 100
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    setData (data) {
      this.fileList.splice(0, this.fileList.length)
      if (data) {
        for (let prop in data) {
            if ('content' === prop) {
            this.content = data[prop]

                this.$refs.ue.editor.setContent(this.content)
            //this.$ref.ue.setUeContent(response.data.content);
             }
          this.$set(this.form, prop, data[prop] || '')
        }
        if (this.form.imgUrl) {
          this.fileList.push({
            name: '封面图',
            url: this.form.imgUrl
          })
        }
      } else {
        this.resetFormData()
      }
    },
    resetFormData () {
      for (let prop in this.form) {
        this.$set(this.form, prop, '')
      }
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
        this.form.content = this.$refs.ue.getUEContent()
      modifyLessons(this.form)
        .then(response => {
          console.log(this.form, response)
          loading.close();
          if (response.success) {
            this.$message({
              message: (this.form.id ? "修改" : "新增") +"成功",
              type: "success"
            });
            this.$emit('modifySuccess', this.form.id)
          } else {
            this.$message({
              message: (this.form.id ? "修改" : "新增") + "失败",
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
      this.form.imgUrl = response.data.url;
      this.fileList.splice(0, this.fileList.length);
      this.fileList.push({
        name: file.name,
        url: response.data.url
      });
    }
  },
  components: {
    quillEditor,
      Ueditor
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.ql-toolbar.ql-snow {
  line-height: initial;
}
.ql-editor{
    height:500px;
}
</style>


