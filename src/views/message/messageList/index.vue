<template>
  <div>
    <el-card style="height: 160px;width: 1200px; margin: 30px 0 20px 30px;">
      <el-form :inline="true" class="demo-form-inline">
        <div class="searchContainer">
          <i class="el-icon-search search">筛选搜索</i>
          <el-form-item class="searchButton">
            <el-button type="primary" @click="searchMessage">查询搜索</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </div>
        <el-form-item label="消息标题:">
          <el-input v-model="messageTitle" placeholder="筛选消息标题" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="inline" label="发布时间:  " prop="createTime">
          <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" placeholder="选择时间范围" @keyup.enter.native="handleQuery" unlink-panels>
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="addContainer">
      <i class="el-icon-tickets">消息列表</i>
      <el-button class="addButton" type="primary" @click="handleAdd()">添加</el-button>
    </el-card>
    <el-card style="height: 300px;width: 1200px; margin-left: 30px;">
      <el-table :data="tableData" border height="250" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" align="center" width="250">
        </el-table-column>
        <el-table-column prop="title" label="消息标题" align="center" width="220">
        </el-table-column>
        <el-table-column prop="image" label="手机号" align="center" width="220">
        </el-table-column>
        <el-table-column prop="sendTime" label="发布时间" align="center" width="220">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看详情</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="this.tableData.length">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getMessageList, messageDel, searchMessage } from "../../../api/message";

export default {
  data() {
    return {
      //搜索
      messageTitle: '',
      tableData: [],//所有数据
      currentPage: 1,
      pagesize: 5,
      setShow: false,
      setShowMsg: '更多查询条件',
      value: '',
      styleArrow: true,
      setContent: '',
      setTitle: ''
    }
  },
  methods: {
    //搜索功能
    searchMessage() {
      searchMessage(this.messageTitle).then((res) => {
        console.log(res);
        this.tableData = res.data
      })
    },
    //消息删除
    handleDelete(row) {
      console.log(row);
      return messageDel(row.id).then((res) => {
        console.log(res);
        this.$message({
          type: 'error',
          message: '成功删除'
        })
        this.getMessage()
      }).catch((err) => {
        console.log(err);
      })
    },
    //分页功能
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(`当前页: ${currentPage}`);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({
        path: 'messageCreate'
      }) // 路由跳转
    },
    //重置功能
    resetForm() {
      this.$options.data();
      // // 重置数据
      // this.$data = this.$options.data();
      //  有报错Avoid replacing instance root $data. Use nested data properties instead.
      // Object.assign(this.$data, this.$options.data())
      this.messageTitle = "";
      this.value = ""
    },
    //查看消息详情
    handleClick(row) {
      console.log(row.id);
      this.$router.push({ name: "messageDetail", params: { row } });
    },
    //获取消息列表
    getMessage() {
      getMessageList().then((res) => {
        this.tableData = res.rows
        console.log(res);
      })
    },
  },

  mounted() {
    this.getMessage();
  },
}

</script>

<style lang="scss" scoped>
/* 消息列表行 */
.addContainer {
  height: 70px;
  width: 1200px;
  margin: 0 0 20px 30px;
}

.addButton {
  margin-left: 990px;
}

.searchContainer {
  display: flow-root;

}

.searchContainer i {
  float: left;
  margin-top: 15px;
  font-weight: bold;
}

.searchButton {
  float: right;
}
</style>
