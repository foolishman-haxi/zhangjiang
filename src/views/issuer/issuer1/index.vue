<template>
  <div class="app-container">
    <!-- 筛选 -->
    <el-row>
      <div class="select-box">
          <div class="search-title">
            <i class="el-icon-search"></i>
            <span>  筛选搜查</span>
            <div class="search-button">
              <el-button  @click="resetQuery" >重置</el-button>
              <el-button  type="primary"  @click="handleQuery">查询搜索</el-button>
            </div>
          </div>
          <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="120px" class="search-form">
            <el-form-item label="发行方名称：" prop="issuerName">
              <el-input
                v-model="queryParams.issuerName"
                placeholder="请输入发行方名称"
                clearable
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-form>
        </div>
    </el-row>
    <!-- 标题 -->
    <el-row>
      <div class="list-title">
        <div class="title">
          <span class="el-icon-tickets"></span>
          <span class="title-font">发行方列表</span>
        </div>
        <div class="btn-add">
          <el-button size="small" type="primary" plain @click="handleAdd()">添加</el-button>
        </div>
      </div>
    </el-row>

    <el-row>
      <!--用户数据-->
      <el-table v-loading="loading" :data="issuerList"  border >
        <el-table-column label="ID" align="center"  prop="id" />
        <el-table-column label="头像" align="center"  prop="avatar"  :show-overflow-tooltip="true" >
          <template slot-scope="scope">
            <el-avatar size="medium" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="发行方名称" align="center"  prop="issuerName"  :show-overflow-tooltip="true" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="pagination.current"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next"
        :total="pagination.total"
        @pagination="getList"
        @current-change="onPageChange"
        class="paper"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getIssuerList, deleteIssuer, findIssuer } from '@/api/issuer/list'

export default {
  name: "User",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 用户表格数据
      issuerList: [],
      // 查询参数
      queryParams: {
        issuerName: undefined,
      },
      // 分页参数
      pagination:{
        total: 0,
        current: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询发行方列表 */
    getList() {
      this.loading = true;
      getIssuerList({}).then((res) => {
        this.issuerList = res.rows;
        this.loading = false;
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pagination.current = 1;
      this.loading = true;
      findIssuer({issuerName: this.queryParams.issuerName}).then( (res) => {
        this.issuerList = res.data;
        this.loading = false;
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.getList();
    },
    // 页号发生变化
    onPageChange(number){
      this.pagination.current=number;
      this.getList();
    },
    // 添加按钮
    handleAdd(){
      this.$router.push({ name:"createIssuer" });
    },
    // 修改按钮
    handleUpdate(row){
      this.$router.push({ name:"createIssuer",params:{ row }});
    },
    // 删除按钮
    handleDelete(row){
      this.$confirm('是否确认删除名称为"' + row.issuerName + '"的发行方？','提示').then(function() {
        return deleteIssuer(row.id);
      }).then((res) => {
        this.$message({
          type: 'success',
          message: res.msg
        });
        this.getList();
      }).catch((res)=>{
        this.$message({
          type: 'error',
          message: res.msg
        });
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.select-box{
  border: 1px solid rgb(0, 0, 0,0.1);
  border-radius: 5px;
  padding: 20px;
}
.search-form{
  margin-top: 20px;
  padding: 0 20px;
}
.search-title{
  overflow: hidden;
}
.search-button{
  float: right;
}
.el-row {
  margin-bottom: 20px;
}
.list-title {
  height: 50px;
  width: 100%;
  border: solid 1px #DCDFE6;
  border-radius: 5px;

  .title {
    margin: 14px;
    float: left;
  }

  .title-font {
    margin-left: 5px;
  }
}
.paper{
  float: right;
  margin-top: 10px;
}
.btn-add {
  margin: 10px;
  float: right;
}
.footer{
  height: 20px;
  .footer-button{
    float: right;
  }
}

</style>