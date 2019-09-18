<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="选择分类" class="handle-select mr10">
                    <el-option key="1" label="工作动态" value="1"></el-option>
                    <el-option key="2" label="通知公告" value="2"></el-option>
                    <el-option key="3" label="行业资讯" value="3"></el-option>
                    <el-option key="4" label="政策法规" value="4"></el-option>
                    <el-option key="5" label="培训风采" value="5"></el-option>
                </el-select>
                <el-input v-model="keywords" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="goAddNews">新增</el-button>
                  <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                <el-button type="primary" @click="_batchPublishNews">一键发布</el-button>
                </div>
            </div>
            <el-table :data="tableData" border v-loading="loading" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="标题"></el-table-column>
                <el-table-column prop="publishTime" label="发布时间" sortable width="150"></el-table-column>
                <el-table-column prop="category" label="分类" width="120"></el-table-column>
                <el-table-column prop="publishMan" label="发布人" width="120"></el-table-column>
                <el-table-column label="状态" width="70">
                  <template slot-scope="scope">
                    <template v-if="scope.row.status === 0"><el-tag>新增</el-tag></template>
                    <template v-if="scope.row.status === 1"><el-tag type="success">发布</el-tag></template>
                    <template v-if="scope.row.status === 2"><el-tag type="info">撤回</el-tag></template>
                    <template v-if="scope.row.status === 3"><el-tag type="warning">删除</el-tag></template>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="small" @click="_editNews(scope.row.id, scope.row.name)">编辑</el-button>
                        <template v-if="scope.row.status !== 1">
                          <el-button size="small" type="success" @click="_publishNews(scope.row.id)">发布</el-button>
                        </template>
                        <template v-if="scope.row.status === 1">
                          <el-button size="small" type="info" @click="_recallNews(scope.row.id)">撤回</el-button>
                        </template>
                        <template v-if="scope.row.status !== 1">
                          <el-button size="small" type="danger" @click="_confirmDelete(scope.row.id)">删除</el-button>
                        </template>
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
            <newsAdd @modifySuccess="modifySuccess" ref="newsAddComp"></newsAdd>
        </el-dialog>

        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { queryNews, publishNews, recallNews, deleteNews } from "@/api/service";
import newsAdd from './news-add'
export default {
  name: "basetable",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      select_word: "",
      select_cate: "",
      total: 0,
      keywords: '',
      title: '',
      loading: false,
      url: "./static/vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  components: {newsAdd},
  methods: {
    goAddNews() {
      this.$router.push('/news-add')
    },
    _editNews(id, title) {
      this.editVisible = true;
      this.$nextTick(() => {
        this.title = title + '-修改'
        this.$refs.newsAddComp.getNewsDetail(id)
      })
    },
    modifySuccess() {
      this.editVisible = false;
      this.getData()
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
    _batchDeleteNews() {
      if (this.multipleSelection.length > 0) {
        let ids = []
        this.multipleSelection.forEach(item => {
          ids.push(item.id)
        })
        this._deleteNews(ids.join(','))
      } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
    },
    _deleteNews(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      deleteNews(id)
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
    _recallNews(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      recallNews(id)
        .then(() => {
          loading.close();
          this.$message({
            message: "撤回成功",
            type: "success"
          });
          this.getData();
        })
        .catch(error => {
          loading.close();
        });
    },
    _batchPublishNews() {
      if (this.multipleSelection.length > 0) {
        let ids = []
        this.multipleSelection.forEach(item => {
          ids.push(item.id)
        })
        this._publishNews(ids.join(','))
      } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
    },
    _publishNews(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      publishNews(id)
        .then(() => {
          loading.close();
          this.$message({
            message: "发布成功",
            type: "success"
          });
          this.getData();
        })
        .catch(error => {
          loading.close();
        });
    },
    getData() {
      this.loading = true
      this.tableData.splice(0, this.tableData.length)
      queryNews({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        keywords: this.keywords,
          category: this.select_cate
      }).then(res => {
        this.loading = false
        this.tableData.push(...res.list)
        this.total = res.total;
      }).catch(() => {
        this.loading = false
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
    },











    // formatter(row, column) {
    //   return row.address;
    // },
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    // handleEdit(index, row) {
    //   this.idx = index;
    //   const item = this.tableData[index];
    //   this.form = {
    //     name: item.name,
    //     date: item.date,
    //     address: item.address
    //   };
    //   this.editVisible = true;
    // },
    // handleDelete(index, row) {
    //   this.idx = index;
    //   this.delVisible = true;
    // },
    // delAll() {
    //   const length = this.multipleSelection.length;
    //   let str = "";
    //   this.del_list = this.del_list.concat(this.multipleSelection);
    //   for (let i = 0; i < length; i++) {
    //     str += this.multipleSelection[i].name + " ";
    //   }
    //   this.$message.error("删除了" + str);
    //   this.multipleSelection = [];
    // },

    // // 保存编辑
    // saveEdit() {
    //   this.$set(this.tableData, this.idx, this.form);
    //   this.editVisible = false;
    //   this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    // },
    // // 确定删除
    // deleteRow() {
    //   this.tableData.splice(this.idx, 1);
    //   this.$message.success("删除成功");
    //   this.delVisible = false;
    // }
  }
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
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
