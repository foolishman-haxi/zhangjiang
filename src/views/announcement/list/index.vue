<template>
  <div class="app-container">
    <!-- 筛选 -->
    <div class="select-box">
      <div class="search-icon">
        <i class="el-icon-search"></i>
        <span> 筛选搜查</span>
        <div class="search-button">
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="handleQuery">查询搜索</el-button>
        </div>
      </div>
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
        <el-form-item class="inline" label="公告标题:  " prop="title">
          <el-input v-model="queryParams.title" placeholder="筛选公告标题" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item class="inline" label="发布时间:  " prop="dateRange">
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" placeholder="选择时间范围" value-format="yyyy-MM-dd" @keyup.enter.native="handleQuery"
            unlink-panels>
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>


    <!-- 标题 -->
    <el-row>
      <div class="list-title">
        <div class="title">
          <span class="el-icon-tickets"></span>
          <span class="title-font">公告列表</span>
        </div>
        <div class="btn-add">
          <el-button size="small" type="primary" plain @click="handleAdd()">添加</el-button>
        </div>
      </div>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="noticeList" border>
      <el-table-column label="ID" align="center" prop="noticeId" width="100" />
      <el-table-column label="公告标题" align="center" prop="noticeTitle" :show-overflow-tooltip="true" />
      <el-table-column label="发布时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background :current-page="pagination.current" :page-size="pagination.pageSize"
      layout="total, prev, pager, next" :total="pagination.total" @pagination="getList" @current-change="onPageChange"
      class="paper">
    </el-pagination>
  </div>
</template>

<script>
import { getNoticeList, deleteNotice, queryNotice } from '@/api/announce/list';

export default {
  name: "Notice",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      noticeList: [],
      // 查询的时间参数
      dateRange: [],
      // 查询参数
      queryParams: {
        title: undefined,
        noticeTimeLeft: undefined,
        noticeTimeRight: undefined
      },
      // 分页参数
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      getNoticeList().then(res => {
        console.log(res);
        this.noticeList = res.rows;
        this.pagination.total = res.total;
        this.pagination.current = 1;
        this.loading = false;
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pagination.current = 1;
      this.queryParams.noticeTimeLeft = this.dateRange ? this.dateRange[0] : undefined;
      this.queryParams.noticeTimeRight = this.dateRange ? this.dateRange[1] : undefined;
      this.loading = true;
      queryNotice({ ...this.queryParams }).then(res => {
        //console.log(res);
        this.noticeList = res.rows;
        this.pagination.total = res.total;
        this.loading = false;
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({ name: "announcementAdd" });
    },
    // 查看详情
    handleDetail(row) {
      this.$router.push({ name: "announcementDetail", params: { row } });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      console.log(row);
      this.$confirm('是否确认删除公告编号为"' + row.noticeId + '"的数据项？', '提示').then(function () {
        return deleteNotice(row.noticeId);
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList();
      }).catch(() => { });
    },
    // 页号发生变化
    onPageChange(number) {
      this.pagination.current = number;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}

.list-title {
  height: 50px;
  width: 100%;
  border: solid 1px #DCDFE6;

  .title {
    margin: 14px;
    float: left;
  }

  .title-font {
    margin-left: 5px;
  }
}

.btn-add {
  margin: 10px;
  float: right;
}

.select-box {
  border: 1px solid rgb(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.inline {
  margin-right: 30px;
}

.search-icon {
  padding-bottom: 20px
}

.search-button {
  float: right;
}

.paper {
  float: right;
  margin-top: 10px;
}
</style>
