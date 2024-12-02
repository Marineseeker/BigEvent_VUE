<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const PasswordInfo = ref({
    oldPwd: '',
    newPwd: '',
    rePwd: ''
});

const rules = {
    oldPassword: [
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
    rePassword: [
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
            <el-col :span="12">
                <el-form :model="PasswordInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="密码" prop="oldPassword">
                        <el-input v-model="PasswordInfo.oldPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="PasswordInfo.newPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rePassword">
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