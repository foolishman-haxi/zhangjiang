<template>
  <div>
    <div class="searchbar">
      <el-form :model="queryParams" class="demo-form-inline" ref="formInline">
        <el-form-item>
          <span class="text">
            <i class="el-icon-search"></i>
            筛选搜索
          </span>
          <el-button type="primary" size="small" @click="handleQuery()">查询搜索</el-button>
          <el-button @click="resetQuery()" size="small">重置</el-button>
        </el-form-item>

        <el-form-item required>
          <el-col :span="10">
            <el-form-item label="藏品名称（套）：" label-width="140px" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入藏品名称" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="创建时间：" label-width="160px" prop="date">
              <el-date-picker v-model="queryParams.startTime" type="daterange" align="right" unlink-panels
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="total">
      <i class="el-icon-tickets" style="margin-right: 5px"></i>套系列表
      <!-- 共有<span style="color: #1890ff">{{ seriesList.length }}</span>条数据 -->
      <div class="btn-add">
        <el-button size="small" type="primary" plain @click="handleAdd()">添加</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="list">
      <el-row>
        <el-radio-group v-model="tabPosition" prop="type">
          <el-radio-button :label=0 @change="getList">在售</el-radio-button>
          <el-radio-button label="预售">预售</el-radio-button>
          <el-radio-button label="已过期">已过期</el-radio-button>
        </el-radio-group>
        <el-table v-loading="loading" :data="seriesList" border>
          <el-table-column prop="id" label="ID" width="100px" align="center" />
          <!-- <el-table-column label="0在售 1预售 2已过期" align="center" prop="type" /> -->
          <el-table-column prop="name" label="藏品名称（套）" align="center" />
          <el-table-column prop="startTime" label="创建时间" align="center" />
          <el-table-column prop="endTime" label="截至时间" align="center" />
          <!-- <el-table-column prop=" " label="藏品数量" align="center"/> -->
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.state == "0" ?"未上架" : "已上架" }}</span> -->
              <el-button v-show="scope.row.status" type="success" plain>已上架</el-button>
              <el-button v-show="!scope.row.status" type="warning" plain>未上链</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleDetail(scope.row)">藏品列表</el-button>
              <div>
                <el-button type="text" size="mini" v-show="!scope.row.status" @click="onShelf(scope.row)">上链</el-button>
                <el-button type="text" size="mini" v-show="scope.row.status"
                  @click="onShelf(scope.row)">下架</el-button><el-button type="text" size="mini"
                  @click="changeTime(scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div>
      <el-pagination background :current-page="pages.currentPage" ayout="total,prev, pager, next" :total="pages.total"
        style="margin-right: 10px; float: right" :page-size.sync="pages.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!-- 修改时间的弹框 -->
    <!-- <el-dialog title="修改时间" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" style="padding: 20px">
      截止日期：<el-date-picker v-model="value1" type="datetime" placeholder="结束日期">
      </el-date-picker>
      <h6 style="color: red">
        当前结束日期：{{ this.queryParams.endTime }}，结束日期须大于当前结束日期
      </h6>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getChange()">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>
<script>

//后端接口
import { listSystem, findSystem } from "@/api/collection/seriesList";
export default {
  created() {
    this.getSeries();
  },
  data() {
    return {
      // 查询参数
      queryParams: {
        name: undefined,
      },
      //选项卡筛选参数---已售预售已过期
      queryParams2: {
        type: null,
      },
      // 加载效果
      loading: true,
      // 修改时间弹框绑定的时间
      value1: "",
      // 弹框
      dialogVisible: false,
      //上架
      // shelves: true,
      // 分页参数
      pages: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 表单
      formInline: {},

      tabPosition: 0,
      //套系列表表格数据
      seriesList: [],
    };
  },


  methods: {

    /** 查询【套系】列表 */
    getSeries() {
      this.loading = true;
      listSystem(this.queryParams).then((res) => {
        this.seriesList = res.rows;
        this.total = res.total;
        this.loading = false;
      })
    },
    // 查询搜索
    handleQuery() {
      this.pages.currentPage = 1;
      this.getSeries();
    },
    // 重置表单
    resetQuery() {
      this.resetForm("formInline");
      this.handleQuery();
    },
    //选择套系列表
    findType() {
      this.loading = true;
      listSystem({ type: this.queryParams2.type }).then((res) => {
        this.seriesList = res.rows;
        this.total = res.total;
        this.loading = false;
      })
    },
    //得到分类列表
    getList() {
      this.pages.currentPage = 1;
      this.findType();
    },
    //完成时间修改
    getChange(row) {
      this.dialogVisible = false;
      console.log(this.value1)
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
    // 修改
    changeTime(row) {
      this.$router.push({ name: "createseries", params: { row } });
    },
    //关闭修改时间的弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },

    // 藏品上架
    onShelf(row) {
      this.$confirm("是否要更改藏品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log("之前", row.state);
          // 更改状态
          row.status = !row.status;
          // console.log("之后", row.state);
          this.$message({
            type: "success",
            message: "藏品操作成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 添加套系
    handleAdd() {
      this.$router.push({ path: "/createseries" });
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pages.currentPage = val;
    },
    //商品列表
    handleDetail(row) {
      this.$router.push({ name: "collections", params: { row }, query: { id: row.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.searchbar {
  border: 1px solid #ebebeb;
  margin: 20px 15px 20px 20px;
  padding: 20px;
  border-radius: 4px;

  .text {
    font-size: medium;
  }

  button {
    margin: 10px;
    float: right;
  }
}

.total {
  border: 1px solid #ebebeb;
  margin: 20px 15px 20px 20px;
  padding: 20px;
  border-radius: 4px;
}

.btn-add {
  float: right;
  margin: auto;
}

.list {
  margin: 20px 10px 20px 20px;
}
</style>
<style>