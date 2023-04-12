<template>
    <div>
      <!-- card组件 -->
      <el-card
        class="announcementBox"
        style="width: 700px; padding-top: 30px; padding-bottom: 30px"
      >
        <div class="content">
          <!-- 表单组件 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- 表单项组件 -->
            <el-form-item label="发行方名称:" prop="issuerName">
              <el-input
                v-model="ruleForm.issuerName"
                placeholder="请输入发行方名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="createBy">
              <el-input
                v-model="ruleForm.createBy"
                placeholder="请输入联系人"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="mobile">
              <el-input
                v-model="ruleForm.mobile"
                placeholder="请输入联系电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱:" prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="请输入电子邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="详细地址:" prop="updateBy">
              <el-input
                v-model="ruleForm.updateBy"
                placeholder="请输入详细地址"
              ></el-input>
            </el-form-item>
            <!-- 上传头像 -->
            <el-form-item label="上传头像:" prop="avatar">
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrl"
                accept="image/*"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img
                  v-if="ruleForm.avatar"
                  :src="ruleForm.avatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入备注"
                v-model="ruleForm.remark"
              ></el-input>
            </el-form-item>
            <!-- 创建按钮 -->
            <div class="button" v-show="createVisible">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                  提交
                </el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </div>
            <!-- 修改按钮 -->
            <div class="button" v-show="!createVisible">
              <el-form-item>
                <el-button type="primary" @click="update">
                  提交
                </el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </template>
  <script>
  // 引入接口 修改到api文件夹对应的文件夹下
  import { createIssuer, uploadAvatar, updateIssuer } from "@/api/issuer/create";
  
  export default {
    name: "IssuerCreate",
    data() {
      return {
        // 表单数据
        ruleForm: {
          // 发行方ID
          issuerID:"",
          // 发行方名称
          issuerName: "",
          // 联系人
          createBy: "",
          // 联系电话
          mobile: "",
          // 电子邮箱
          email: "",
          // 详细地址
          updateBy: "",
          // 头像
          avatar: "",
          // 备注
          remark: "",
        },
        // 表单校验规则
        rules: {
          // 发行方名称 校验规则 不能为空
          issuerName: [
            { required: true, message: "请输入发行方名称", trigger: "blur" },
          ],
        },
        // 
        // 未修改前的发行方数据
        row:{},
        // 按钮可见性
        createVisible:true,
        upLoadUrl: process.env.VUE_APP_BASE_API  + "/files/send"
      };
    },
    created(){
      this.getRow();
    },
    methods: {
      // 提交表单
      submitForm(formName) {
        // 校验表单
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
            // 校验通过 调接口提交数据
            createIssuer(this.ruleForm).then((res) => {
              if (res.code === 200) {
                // 如果返回状态码为200 提示添加成功 200为后端定义成功状态码
                // 提示添加成功
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                // 重置表单
                this.resetForm(formName);
                // 返回上一页 真实接口取消注释
                // this.$router.back();
              }
            });
          //}
        //});
      },
      // 自定义上传头像 覆盖默认上传
      handleUpload({ file }) {
        // 创建formdata对象
        const formData = new FormData();
        // 将文件添加到formdata对象中
        formData.append("file", file);
        // 调用上传头像接口
        uploadAvatar(formData).then((res) => {
          if (res.code === 200) {
            // 如果返回状态码为200 将返回的头像地址赋值给表单头像字段
            this.ruleForm.avatar = res.data;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 获取修改发行方信息
      getRow(){
        if(this.$route.params.row !=null || undefined){
          // console.log('row',this.$route.params.row)
          this.ruleForm = {...this.$route.params.row};
          this.row = {...this.$route.params.row};
          this.createVisible = false;
        }
      },
      // 修改--提交按钮
      update(){
        function isSame(obj1,obj2){
          for(let key in obj1){
            if(obj1[key] != obj2[key])
              return false;
          }
          return true;
        }
        if(isSame(this.row,this.ruleForm)){
          this.$message({
            message: '数据没有进行修改',
            type: 'warning'
          });
          return;
        }
        this.$confirm('是否确认修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateIssuer(this.ruleForm).then((res)=>{
            this.$message({
              type: 'success',
              message: res.msg,
            });
            this.$router.back();
          }).catch((res)=>{
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          })
        }).catch(_=>_);
      },
      // 修改--取消按钮
      cancel(){
        this.$router.back();
      },
      // 上传头像成功
      handleAvatarSuccess(res, file) {
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
        this.ruleForm.avatar = URL.createObjectURL(file.raw);
      },
    },
    
  };
  </script>
  
  <style>
  .announcementBox {
    margin: 40px auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  </style>
  