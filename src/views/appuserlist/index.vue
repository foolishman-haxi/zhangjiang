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
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px" class="search-form">
              <el-form-item label="编号：" prop="id">
                <el-input
                  v-model="queryParams.id"
                  placeholder="请输入用户编号"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="账号：" prop="username">
                <el-input
                  v-model="queryParams.username"
                  placeholder="请输入用户账号"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="真实姓名：" prop="realname">
                <el-input
                  v-model="queryParams.realname"
                  placeholder="请输入真实姓名"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="手机号码：" prop="mobile">
                <el-input
                  v-model="queryParams.mobile"
                  placeholder="请输入手机号码"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="状态：" prop="state">
                <el-select
                  v-model="queryParams.state"
                  placeholder="用户状态"
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
              <el-form-item label="注册时间：">
                <el-date-picker
                  v-model="queryParams.registerAt"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="实名时间：">
                <el-date-picker
                  v-model="queryParams.updateAt"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
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
            <span class="title-font">用户列表</span>
          </div>
        </div>
      </el-row>
  
      <el-row>
        <!--用户数据-->
        <el-table v-loading="loading" :data="userList"  border >
          <el-table-column label="编号" align="center"  prop="id" />
          <el-table-column label="账号" align="center"  prop="username"  :show-overflow-tooltip="true" />
          <el-table-column label="真实姓名" align="center"  prop="realname"  :show-overflow-tooltip="true" />
          <el-table-column label="手机号" align="center"  prop="mobile" width="120" />
          <el-table-column label="详细地址" align="center"  prop="adress"  width="160" :show-overflow-tooltip="true" />
          <el-table-column label="状态" align="center" prop="state" >
            <template slot-scope="scope">
              <span>{{ getState(scope.row.state)  }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" align="center" prop="registerAt"  width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.registerAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="实名时间" align="center" prop="updateAt"  width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updateAt) }}</span>
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
  import {getUsersList} from '@/api/user'
import { notDeepEqual } from 'assert';
  
  export default {
    name: "User",
    data() {
      return {
        // 遮罩层
        loading: true,
        // 用户表格数据
        userList: null,
        // 日期范围
        dateRange:[],
        // 查询参数
        queryParams: {
          username:undefined,
          id:undefined,
          mobile:undefined,
          state:undefined,
          realname:undefined,
          registerAt:[],
          updateAt:[],
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
            label:"未认证"
          },
          {
            value:"1",
            label:"已认证"
          }
        ]
      };
    },
    created() {
      this.getList()
    },
    computed:{
    },
    methods: {
      /** 查询用户列表 */
      getList() {
        this.loading = true;
        getUsersList({
          ...this.queryParams
        }).then(res => {
          console.log("数据",res);
          this.userList = res.rows;
          this.pagination.total = res.total;
          this.pagination.current = 1;
          this.loading = false;
        });
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.pagination.current = 1;
        //console.log("时间",this.dateRange);
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.queryParams.registerAt = [];
        this.queryParams.updateAt = [];
        this.resetForm("queryForm")
        this.handleQuery();
      },
      // 页号发生变化
      onPageChange(number){
        this.pagination.current=number;
        this.getList();
      },
      // 获取用户状态
      getState(state){
        if(state=="0"){
          return "未认证";
        }
        else if(state==null){
          return "未知";
        }
        else{
          return "已认证";
        }
      }
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