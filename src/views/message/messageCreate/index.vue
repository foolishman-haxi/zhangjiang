<template>
  <div>
    <el-card class="announcementBox" style="height: 700px;width: 700px;">
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="消息标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入公告名称"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="接受用户:" prop="receivedUsers">
            <el-input type="textarea" :rows="2" placeholder="请导入用户" autosize v-model="ruleForm.receivedUsers"></el-input>
          </el-form-item>
          <el-form-item label="消息内容" prop="desc">
            <quill-editor v-model="ruleForm.desc" ref="myQuillEditor" style="height: 320px;" :options="editorOption">
            </quill-editor>
          </el-form-item>
          <div class="button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { submitMessage } from '../../../api/message'
import qs from 'qs'; //引入 == 局部引入不需要在main.js配置中引入

export default {
  title: 'FuncFormsEdit',
  components: {
    quillEditor
  },
  data() {
    return {
      //富文本
      editorOption: {},
      ruleForm: {
        title: '',
        date1: '',
        delivery: false,
        desc: '',
        receivedUsers: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入公告名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        receivedUsers: [
          { required: true, message: '请导入接受用户', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写公告内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
     
      this.$refs[formName].validate((valid) => {
        if (valid) {
          submitMessage({
            addTitle: this.ruleForm.title,
            addDate: this.ruleForm.date1,
            addReceivedUsers: this.ruleForm.receivedUsers,
            addDesc: this.ruleForm.desc
          }).then((res) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            console.log(res);
            this.$refs[formName].resetFields();
            this.$router.push({ name: "messageList" });
          }).catch((e) => {
            console.log(e.message);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
  
<style>
.announcementBox {
  margin-top: 40px;
  margin-left: 300px;
}

.content {
  margin-top: 20px;
  margin-right: 30px;
  position: relative;
}

.button {
  position: absolute;
  margin-top: 70px;
}
</style>
