<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 密码数据模型
const PasswordInfo = ref({
    oldPwd: '',
    newPwd: '',
    rePwd: ''
});


// 表单验证规则
const rules = {
    oldPwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在5到16个字符', trigger: 'blur' }
    ],
    newPwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在5到16个字符', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value === PasswordInfo.oldPwd) {
                    callback(new Error('新密码不能与原密码相同'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    rePwd: [
        { required: true, message: '确认密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在5到16个字符', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== PasswordInfo.value.newPassword) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
};

// 发送请求
import { userPasswordUpdateService } from '@/api/user';
const updateUserPassword = async() => {
    let result = await userPasswordUpdateService(PasswordInfo.value);
    if (result.code === 0) {
        ElMessage.success('修改成功');
        return;
    }
}
</script>


<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="24">
                <el-form :model="PasswordInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="密码" prop="oldPwd">
                        <el-input v-model="PasswordInfo.oldPwd"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="PasswordInfo.newPwd"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="rePwd">
                        <el-input v-model="PasswordInfo.rePwd"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="updateUserPassword">提交修改</el-button>
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
    opacity: 0.8;
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