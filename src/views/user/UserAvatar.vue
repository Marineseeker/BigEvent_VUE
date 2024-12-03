<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import avatar from '@/assets/default.png'
const uploadRef = ref()

import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();


import userUserInfoStore from '@/stores/userInfo';
const userInfoStore = userUserInfoStore();

//用户头像地址
const imgUrl = ref(userInfoStore.info.userPic)

const uploadSuccess = (result) => {
    imgUrl.value = result.data;
}

import { userAvatarUpdateService } from '@/api/user'
import { ElMessage } from 'element-plus';

const updateAvatar = async () => {
    let result = await userAvatarUpdateService(imgUrl.value);
    ElMessage.success(result.message ? result.message : '修改失败');
    userInfoStore.info.userPic = imgUrl.value;
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload ref="uploadRef" class="avatar-uploader" :show-file-list="false" :auto-upload="true"
                    action="/api/upload" name="file" :headers="{ 'Authorization': tokenStore.token }"
                    :on-success="uploadSuccess">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else :src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"
                    @click="uploadRef.$el.querySelector('input').click()">
                    选择图片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style scoped>
.page-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.header-title {
    font-size: 24px;
    color: #333;
}

.reset-password-form {
    margin-top: 20px;
}

.submit-button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 4px;
}
</style>