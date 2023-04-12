<template>
    <div class="app-container">
      <div class="detail-box">
        <el-row class="detail-title">藏品详情</el-row>
        <el-row class="notice-box">
          <el-col >
            <span class="notice-title">{{ collection.name }}</span>
          </el-col>
          <el-col>
            <span>{{ collection.createTime }}</span>
          </el-col>
          <el-col>
            <div class="notice-content">
              {{ collection.collectionsStory }}
            </div>
          </el-col>
        </el-row>
        
      </div>
    </div>
  </template>
  <script>
  export default{
    name:"collectionDetail",
    data(){
      return {
        collection:{},
      }
    },
    created(){
      this.getCollection();
    },
    methods:{
      getCollection(){
        this.collection=this.$route.params.row;
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