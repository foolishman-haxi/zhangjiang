<template>
    <div class="app-container">
      <div class="detail-box">
        <el-row class="detail-title">消息详情</el-row>
        <el-row class="notice-box">
          <el-col >
            <span class="notice-title">{{ message.title }}</span>
          </el-col>
          <el-col>
            <span>{{ message.sendTime }}</span>
          </el-col>
          <el-col>
            <div class="notice-content">
              {{ message.detail }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  <script>
  export default{
    name:"messageDetail",
    data(){
      return {
        // 消息
        message:{},
      }
    },
    created(){
      this.getMessage();
    },
    methods:{
      getMessage(){
        this.message=this.$route.params.row;
        console.log(this.$route.params.row);
        console.log("消息",this.message);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .app-container{
    text-align: center;
  }
  .detail-box{
    width: 80%;
    border: solid 1px #DCDFE6;
    padding: 30px;
    display: inline-block;
    .el-col{
      margin-bottom: 10px;
    }
    .detail-title{
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 20px;
    }
  }
  .notice-title{
    font-weight: bold;
    font-size: 20px;
  }
  
  .notice-content{
    text-indent: 30px;
    line-height: 23px;
  }
  .notice-box{
    text-align: left;
  }
  </style>