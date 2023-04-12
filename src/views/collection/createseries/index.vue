<template>
  <div class="block">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="藏品名称（套）：" prop="name" style="width: 550px">
        <el-input v-model="ruleForm.name" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="藏品图片:" prop="image">
        <el-upload class="avatar-uploader" action="http://localhost:80/dev-api/files/send" accept="image/*"
          :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="开始展示时间" prop="startTime">
        <el-date-picker clearable v-model="ruleForm.startTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择开始展示时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束展示时间" prop="endTime">
        <el-date-picker clearable v-model="ruleForm.endTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择结束展示时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="线下礼品兑换：" prop="exchange" style="width: 550px">
        <el-radio-group v-model="ruleForm.exchange">
          <el-radio label="可兑换"></el-radio>
          <el-radio label="不可兑换"></el-radio>
        </el-radio-group>
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
</template>

<script>
import { updateSystem } from "@/api/collection/seriesList"
export default {
  data() {
    return {
      //表单数据
      ruleForm: {
        name: "",
        // 单选框
        //exchange: "",
        //  时间
        startTime: "",
        endTime:"",
        image:"",
        endTime: "",
        // 上传图片
        // imageUrl: "",
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: "请输入藏品名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20个字符",
            trigger: "blur",
          },
        ],
          // avatar: [
          //   {
          //     required: true,
          //     message: "请按照规范上传尺寸为750px*750px的图片",
          //     trigger: "blur",
          //   },
          // ],
        
        // exchange: [
        //   {
        //     required: true,
        //     message: "请选择",
        //     trigger: "change",
        //   },
        // ],
      },
      //未修改前套系信息
      row: {},
      //创建或修改提交按钮
      createVisible: true,
    };
  },
  created() {
    this.getRow();
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取修改套系信息
    getRow() {
      if (this.$route.params.row != null || undefined) {
        // console.log('row',this.$route.params.row)
        this.ruleForm = { ...this.$route.params.row };
        this.row = { ...this.$route.params.row };
        this.createVisible = false;
      }
    },
    //修改---提交
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
            message: '数据未被修改，请确认',
            type: 'warning'
          });
          return;
        }
        this.$confirm('是否确认修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          updateSystem(this.ruleForm).then((res)=>{
            this.$message({
              type: 'success',
              message: res.msg,
              
            });
            this.$router.back();
          }).catch((res)=>{
            //console.log('11111111');
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          })
        }).catch(_=>_);
    },
    //修改---取消
    cancel(){
        this.$router.back();
      },
  },
};
</script>
<style lang="scss" scoped>
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
  width: 300px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}

.avatar {
  width: 300px;
  height: 300px;
  display: block;
}

.block {
  margin: 20px 100px;
  padding: 60px;
  border: 1px solid #ebebeb;
  border-radius: 5px;
}
</style>
