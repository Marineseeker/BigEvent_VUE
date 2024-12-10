<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">

            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="formType === 'isRegister'" :model="registerData"
                :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item>
                    <p style="text-align: center; font-size: 16px; font-weight: bold; color: #000000; margin: 0;">
                        Communist Party of the United States of America
                    </p>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="formType = 'isLogin'">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>

            <!--忘记密码表单-->
            <el-form ref="form" size="large" autocomplete="off" v-if="formType === 'isForget'" :model="forgetPwdData"
                :rules="rules">
                <el-form-item>
                    <h1>忘记密码</h1>
                </el-form-item>

                <el-form-item prop="emailAddr">
                    <el-input placeholder="请输入您的邮箱" style="width: 75%" v-model="forgetPwdData.emailAddr"></el-input>
                    <el-form-item style="width: 25%">
                        <el-button @click="sendEmail">
                            发送验证码
                        </el-button>
                    </el-form-item>
                </el-form-item>

                <el-form-item prop="code">
                    <el-input :prefix-icon="Lock" placeholder="请输入验证码" v-model="forgetPwdData.code"></el-input>
                </el-form-item>

                <el-form-item prop="newPwd">
                    <el-input :prefix-icon="Lock" placeholder="请输入新密码" v-model="forgetPwdData.newPwd"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="forgetPwd">
                        提交
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="formType = 'isLogin'">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>


            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="formType === 'isLogin'" :model="registerData"
                :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item>
                    <p style="text-align: center; font-size: 16px; font-weight: bold; color: #000000; margin: 0;">
                        Communist Party of the United States of America
                    </p>
                </el-form-item>

                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input name="password" :type="passwordVisible ? 'text' : 'password'" placeholder="请输入密码"
                        v-model="registerData.password">
                        <!-- 使用 suffix 插槽在右侧添加按钮 -->
                        <template #suffix>
                            <img :src="eye" alt="密码可见性切换" @click="togglePasswordVisibility"
                                style="cursor: pointer; width: 20px; height: 20px; background-color: #ffffff; border-radius: 50%;" />
                        </template>
                    </el-input>
                </el-form-item>


                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false" @click="formType = 'isForget'">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="formType = 'isRegister'">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>
</template>

<script setup>
import { useTokenStore } from '@/stores/token';
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import eye from '@/assets/eye.png';
const passwordVisible = ref(false);
const tokenStore = useTokenStore();

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

// 控制注册与登录表单的显示，默认显示注册
const formType = ref('isLogin')

// 数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})

const forgetPwdData = ref({
    emailAddr:'',
    code:'',
    newPwd:'',
})

const checkRePassword = (rule, value, callback) => {
    if (value === "") {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerData.value.password) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}

// 
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在5到16个字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: "blur" }
    ],
    emailAddr: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 6, message: '验证码必须是6位', trigger: 'blur' }
    ]
}

import { userRegisterService, userLoginService, userSendEmailService, UserForgetPwdService} from '@/api/user.js'
// 注册函数
const register = async () => {
    let result = await userRegisterService(registerData.value);
    ElMessage.success(result.msg ? result.msg : 'sigh in success')
}

import { useRouter } from 'vue-router'
import { ssrImportKey } from 'vite/runtime';
const router = useRouter()
// 登陆函数
const login = async () => {
    let result = await userLoginService(registerData.value)
    ElMessage.success(result.msg ? result.msg : 'log in success')
    tokenStore.setToken(result.data)
    console.log(tokenStore.token)
    // 调用路由跳转
    router.push('/layout')
}
// 发送邮件函数
const sendEmail = async() =>{
    let result = await userSendEmailService(forgetPwdData.value)
    ElMessage.success(result.data)
}
// 忘记密码函数
const forgetPwd = async() =>{
    let result = await UserForgetPwdService(forgetPwdData.value)
    ElMessage.success(result.data)
}

import { onMounted, onUnmounted } from 'vue';
// 绑定键盘事件
const handleKeyup = (event) => {
    if (event.key === 'Enter') {
        if (formType.value==="isRegister") {
            register();
        } else if(formType.value==="isLogin"){
            login();
        }else{
            forgetPwd();
        }
    }
};

onMounted(() => {
    document.addEventListener('keyup', handleKeyup);
});

onUnmounted(() => {
    // 移除全局监听器
    document.removeEventListener('keyup', handleKeyup);
});

</script>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #F51C1F;
    /* 将整体背景设置为红色 */

    .bg {
        background: url('@/assets/communism.png') no-repeat center / cover;
        border-radius: 0;
        /* 取消边框圆角，使背景更自然 */
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        background-color: #F51C1F;
        /* 设置表单背景色为红色 */
        padding: 20px;
        /* 添加内边距以避免组件紧贴边缘 */
        border-radius: 10px;
        /* 给表单添加圆角视觉效果 */

        .title {
            margin: 0 auto;
            color: #FFF;
            /* 调整文字颜色为白色以适应红色背景 */
        }

        .button {
            width: 100%;
            background-color: #000;
            /* 按钮背景色黑色 */
            color: #FFF;
            /* 按钮文字白色 */
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
