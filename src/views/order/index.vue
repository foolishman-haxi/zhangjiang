<template>
    <div class="app-container">
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
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px" class="search-form">

              <el-form-item label="账号：" prop="number">
                <el-input
                  v-model="queryParams.number"
                  placeholder="请输入账号"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

              <el-form-item label="订单编号：" prop="oNumber">
                <el-input
                  v-model="queryParams.oNumber"
                  placeholder="请输入订单编号"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

              <el-form-item label="名称：" prop="oName">
                <el-input
                  v-model="queryParams.oName"
                  placeholder="请输入用户名称"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

              <el-form-item label="发行方名称：" prop="lssuerName">
                <el-input
                  v-model="queryParams.lssuerName"
                  placeholder="请输入发行方名称"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

              <el-form-item label="藏品套系ID:" prop="collectionsNumber">
                <el-input
                  v-model="queryParams.collectionsNumber"
                  placeholder="请输入藏品套系ID"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>

              <el-form-item label="藏品ID:" prop="collectionNumber">
                <el-input
                  v-model="queryParams.collectionNumber"
                  placeholder="请输入藏品ID"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="订单类型：" prop="orderType">
                <el-select
                  v-model="queryParams.orderType"
                  placeholder="选择订单类型"
                  clearable
                  style="width: 240px"
                >
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="支付时间：">
                <el-date-picker
                  v-model="dateRange"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
      </el-row>
      <!-- 标题 -->
      <el-row>
        <div class="list-title">
          <div class="title">
            <span class="el-icon-tickets"></span>
            <span class="title-font">订单列表</span>
          </div>
        </div>
      </el-row>
  
      <el-row>
        <!--用户数据-->
        <el-table v-loading="loading" :data="ordersList"  border >
          <el-table-column label="ID" align="center"  prop="oId" width="60" />
          <el-table-column label="订单编号" align="center" width="150" prop="oNumber"  />
          <el-table-column label="藏品套系ID" align="center"  prop="collectionsNumber"  :show-overflow-tooltip="true" />
          <el-table-column label="藏品ID" align="center"  prop="collectionNumber" width="120" />
          <el-table-column label="账号" align="center"  prop="number"  width="120" :show-overflow-tooltip="true" />
          <el-table-column label="名称" align="center"  prop="oName" width="80" />
          <el-table-column label="购买数量" align="center"  prop="buyNumber" width="60" />
          <el-table-column label="发行方名称" align="center"  prop="lssuerName" width="100" />

          
          <el-table-column label="支付时间" align="center" prop="payTime"  width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.payTime) }}</span>
            </template>
          </el-table-column>

        <el-table-column label="订单类型" align="center" prop="orderType" width="80"  >
            <template slot-scope="scope">
              <span>{{ scope.row.orderType == "0" ? "A类" : "B类"  }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="170">
        <template slot-scope="scope">

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
  import {getOrdersList,deleteOrder} from '@/api/order'
  

  export default {
    name: "Order",
    data() {
      return {
        // 遮罩层
        loading: true,
        // 用户表格数据
        ordersList: null,
        // 日期范围
        dateRange:[],
        // 查询参数
        queryParams: {
          number:undefined,
          oNumber:undefined,
          oName:undefined,
          lssuerName:undefined,
          collectionsNumber:undefined,
          collectionNumber:undefined,
          orderType:undefined,

        },
        // 分页参数
        pagination:{
          total:0,
          current:1,
          pageSize:10,
        },
        // 搜索下拉框参数
        options:[
          {
            value:"0",
            label:"A类型"
          },
          {
            value:"1",
            label:"B类型"
          }
        ]
      };
    },
    created() {
      this.getList()
    },
    methods: {
      /** 查询用户列表 */
      getList() {
        this.loading = true;
        getOrdersList({
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize,
          queryParams:this.queryParams,
          dateRange:this.dateRange
        }).then(response => {     
          // console.log(response)
          let data = response.data.data;
          this.ordersList = data.userList;
          this.pagination.total = data.total;
          this.pagination.current = data.pageIndex;
          this.loading = false;
        });
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.pagination.current = 1;
        this.getList();
        
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        this.resetForm("queryForm")
        this.handleQuery();
      },
      // 页号发生变化
      onPageChange(number){
        this.pagination.current=number;
        this.getList();
      },
       /** 删除按钮操作 */
    handleDelete(row) {
      const orderIds = row.oId;
      const oNumber = row.oNumber;
      this.$modal.confirm('是否确认删除编号为"' + oNumber + '"的订单？').then(function() {
        return deleteOrder({id:orderIds});
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {

        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
  </style>
