<template>
  <div class="index-container">
    <div class="ewm-area">
      <img src="../assets/ewm.jpg" alt>
    </div>
    <div class="form-area">
      <el-form
        :rules="rules"
        ref="bookInfoForm"
        label-width="80px"
        :model="bookInfoForm"
        :label-position="labelPosition"
      >
        <el-form-item label="title1:" prop="title">
          <el-input placeholder="请输入书名" v-model="bookInfoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="desc1:" prop="desc">
          <el-input type="textarea" :rows="2" placeholder="请输入简介" v-model="bookInfoForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="avatar:" prop="uploadFlag">
          <input type="text" v-model="bookInfoForm.uploadFlag" style="display:none">
          <el-upload
            :limit="1"
            ref="upload"
            class="upload-demo"
            list-type="picture-card"
            :on-error="handleError"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            action="/api/information/upload"
            :before-remove="handleBeforeRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="btns">
          <el-button class="reset-btn" @click="handleResetForm">重置</el-button>
          <el-button class="submit-btn" type="primary" @click="handleSubmitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Form, FormItem, Input, Button, Upload } from "element-ui";
export default {
  data() {
    return {
      fileList: [],
      labelPosition: "right",
      bookInfoForm: {
        title: "",
        desc: "",
        uploadFlag: ""
      },
      avatar: "",
      rules: {
        title: [
          { required: true, message: "书名不能为空", trigger: "blur" },
          { min: 3, max: 30, message: "长度在3到30个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "描述不能为空", trigger: "blur" },
          { min: 30, message: "不少于30个字符,最好复制粘贴", trigger: "blur" }
        ],
        uploadFlag: [{ required: true, message: "至少上传一张图片" }]
      }
    };
  },
  components: {
    "el-form": Form,
    "el-input": Input,
    "el-button": Button,
    "el-upload": Upload,
    "el-form-item": FormItem
  },
  methods: {
    handleExceed() {
      this.$message({
        message: "最多只能上传一张图片",
        type: "warning"
      });
    },
    handleBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      if (file.status === "success") {
        this.fileList = fileList;
        this.bookInfoForm.uploadFlag = file;
        this.$refs.bookInfoForm.validateField(["uploadFlag"]);
      }
    },
    handleRemove(file, fileList) {
      this.avatar = "";
      this.fileList = [];
      this.bookInfoForm.uploadFlag = "";
    },
    handleError(message = "上传失败,请重试") {
      this.$message({
        message,
        type: "error"
      });
    },
    handleSuccess(res) {
      const { code, data } = res;
      if (code === 1) {
        const { url } = data;
        this.avatar = url.replace("http", "https");
      } else {
        const { message } = res;
        this.handleRemove();
        this.handleError(message);
        this.$refs.upload.clearFiles();
      }
    },
    handleSubmitForm() {
      this.$refs.bookInfoForm.validate(valid => {
        if (valid) {
          const {
            avatar,
            bookInfoForm: { title, desc }
          } = this;
          const params = { title, desc, avatar };
          axios.post("/api/information/list", params).then(res => {
            const { code, data } = res.data;
            if (code === 1) {
              this.handleResetForm();
              this.$router.push("/admin");
            } else {
              const { message } = res;
              this.handleError(message);
            }
          });
        } else {
          console.log("error submit!!");
        }
      });
    },
    handleResetForm() {
      this.avatar = "";
      this.$refs.upload.clearFiles();
      this.$refs.bookInfoForm.resetFields();
    }
  }
};
</script>

<style  lang="less" >
.index-container {
  display: flex;
  margin-top: 200px;
  width: 100%;
  justify-content: center;
  .form-area {
    padding: 15px;
    width: 500px;
    height: 200px;
    .el-input__inner {
      width: 200px;
    }
    .el-upload-list__item-preview {
      display: none !important;
    }
    .el-upload-list__item-delete {
      margin-left: 0;
    }
    .btns {
      display: flex;
      justify-content: center;
    }
    .submit-btn,
    .reset-btn {
      width: 100px;
      margin: 0 15px;
    }
  }
}
</style>
