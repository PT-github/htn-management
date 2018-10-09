<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="课程名称" class="handle-input mr10"></el-input>
                <el-select v-model="cate" clearable placeholder="请选择课程分类">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                  <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" fixed label="课程名称"></el-table-column>
                <el-table-column align="center" label="课程分类" width="150">
                  <template slot-scope="scope">
                    <span>{{ optionsObj[scope.row.cate] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="开班时间" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.startTime | moment('MM月dd日') }}-{{ scope.row.endTime | moment('MM月dd日') }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="封面图" width="100">
                  <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" alt="" width="65" height="60">
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="classHour" label="课时" width="100"></el-table-column>
                <el-table-column align="center" label="培训费" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.trainingFee + '元' }}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="examInforFee" label="考试及资料费" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.trainingFee + '元' }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="合计" width="100">
                  <template slot-scope="scope">
                    {{ (scope.row.trainingFee + scope.row.examInforFee) + '元' }}
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="_editCerti(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="_confirmDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNo"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="90%" :close-on-click-modal="false">
            <lessonAdd @modifySuccess="modifySuccess" :options="options" :formData="form" ref="lessonAddComp"></lessonAdd>
        </el-dialog>
    </div>
</template>
<script>
import { queryLessonCate, queryLessonList, deleteLessonList, modifyTeacher } from "@/api/service";
import lessonAdd from './lesson-add'
export default {
  name: "lessonListManagement",
  data() {
    return {
      options: [],
      pageNo: 1,
      pageSize: 10,
      name: "",
      cate: "",
      total: 0,
      title: "",
      tableData: [],
      editVisible: false,
      fileList: [],
      multipleSelection: [],
      loading: false,
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
        content: ""
      }
    };
  },
  created() {
    this.getCateData()
    this.getData();
  },
  computed: {
    optionsObj () {
      let obj = {}
      if (this.options.length > 0) {
        this.options.forEach(item => {
          obj[item.id] = item.name
        })
      }
      return obj
    }
  },
  methods: {
    modifySuccess (id) {
      this.editVisible = false
      id && this.getData()
    },
    _confirmDelete(id) {
      this.$confirm("确认是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._deleteNews(id);
        })
        .catch(() => {});
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      modifyTeacher(this.form)
        .then((res) => {
          loading.close();
          if (res.success) {
            this.$message({
              message: (this.form.id ? '修改' : '新增') + "成功",
              type: "success"
            });
            this.getData();
            this.$nextTick(() => {
              this.editVisible = false
            })
          }
        })
        .catch(error => {
          loading.close();
        });
    },
    _editCerti(data) {
      if (data && data.id) {
        this.title = data.name + '-修改'
      } else {
        this.title = '课程新增'
      }
      this.$nextTick(() => {
        this.editVisible = true
        this.$nextTick(() => {
          this.$refs['lessonAddComp'].setData(data)
        })
      })
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
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {},
    _batchDeleteNews() {
      if (this.multipleSelection.length > 0) {
        let ids = [];
        this.multipleSelection.forEach(item => {
          ids.push(item.id);
        });
        this._deleteNews(ids.join(","));
      } else {
        this.$message({
          message: "请至少选择一项",
          type: "warning"
        });
      }
    },
    _deleteNews(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      deleteLessonList(id)
        .then(() => {
          loading.close();
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
        })
        .catch(error => {
          loading.close();
        });
    },
    getCateData() {
      queryLessonCate().then(res => {
        if (res.list && res.list.length > 0) {
          this.options.push(...res.list)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getData() {
      this.loading = true
      this.tableData.splice(0, this.tableData.length)
      queryLessonList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.name,
        cate: this.cate
      }).then(res => {
        this.loading = false
        if (res.list && res.list.length > 0) {
          this.tableData.push(...res.list)
          this.total = res.total;
        }
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    },
    search() {
      this.pageNo = 1;
      this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getData();
    },
    // 分页导航
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  components: {lessonAdd}
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>