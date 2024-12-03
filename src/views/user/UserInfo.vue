<script setup>
import { ref } from 'vue'
import userUserInfoStore from '@/stores/userInfo';
const userInfoStore = userUserInfoStore();
const userInfo = ref({ ...userInfoStore.info })
const rules = {
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
}

import { ElMessage } from 'element-plus';
import { userInfoUpdateService } from '@/api/user';
const updateUserInfo = async() => {
    let result = await userInfoUpdateService(userInfo.value);
    if (result.code !== 200) {
        ElMessage.success(result.message ? result.message : '修改失败');
        userInfoStore.setInfo(userInfo.value);
        return;
    }
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="24">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item>
                </el-form>
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