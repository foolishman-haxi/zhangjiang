<template>
  <div class="block">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="藏品名称：" prop="name" style="width: 550px">
        <el-input v-model="ruleForm.name" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="藏品图片:" prop="image">
        <el-upload class="avatar-uploader" action="http://localhost:80/dev-api/files/send" accept="image/*"
          :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="藏品价格：" prop="price" style="width: 550px">
        <el-input v-model="ruleForm.price" show-word-limit>
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="藏品数量：" prop="collectionsNumber" style="width: 550px">
        <el-input v-model="ruleForm.collectionsNumber" show-word-limit>
          <template slot="append">份</template>
        </el-input>
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
      <el-form-item label="作品故事" prop="collectionsStory" style="width:550px;">
        <el-input type="textarea" v-model="ruleForm.collectionsStory" class="inputStore" :rows="15"></el-input>
      </el-form-item>
      <el-button type="primary" style="margin-left: 200px" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form>
    <el-backtop :bottom="60">
      <div style="{
                    height: 100%;
                    width: 100%;
                    background-color: #f2f5f6;
                    box-shadow: 0 0 6px rgba(0,0,0, .12);
                    text-align: center;
                    line-height: 40px;
                    color: #1989fa;
                  }">
        top
      </div>
    </el-backtop>
  </div>
</template>
  
<script>
import { addCollections } from '../../../api/collection/collections'
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        //  时间
        startTime: "",
        endTime:"",
        price: "",
        collectionsNumber: "",
        // 头像
        image: "",
        collectionsStory: "",
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
        collectionsStory: [
          { required: true, message: "请输入作品故事", trigger: "blur" },
          {
            min: 2,
            max: 200,
            message: "长度在 20 到 200个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入藏品价格", trigger: "blur" },
          {
            max: 20,
            message: "长度在 2 到 20个字符",
            trigger: "blur",
          },
        ],
        collectionsNumber: [
          { required: true, message: "请输入藏品数量", trigger: "blur" },
          {
            max: 20,
            message: "长度在 2 到 20个字符",
            trigger: "blur",
          },
        ],
        createTime: [
          {
            required: true,
            message: "请按照选择时间",
            trigger: "change",
          },
        ],
        endTime: [
          {
            required: true,
            message: "请按照选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addCollections(this.ruleForm).then((res) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            console.log(res);
            this.$refs[formName].resetFields();
            this.$router.push({ name: "collections" });
          }).catch((e) => {
            console.log(e);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 自定义上传头像 覆盖默认上传
    handleUpload({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      // 调用上传头像接口
      uploadAvatar(formData).then((res) => {
        if (res.code === 200) {
          // 如果返回状态码为200 将返回的头像地址赋值给表单头像字段
          this.ruleForm.image = res.data;
        }
      });
    },
    // 上传头像成功
    handleAvatarSuccess(res, file) {
      this.$message({
        type: 'success',
        message: '上传成功!'
      });
      this.ruleForm.image = URL.createObjectURL(file.raw);
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  width: 400px;
  height: 300px;
  line-height: 300px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
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