<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

import { userInfoService } from '@/api/user';
import userUserInfoStore from '@/stores/userInfo';
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();
const userInfoStore = userUserInfoStore();
const getUserInfo = async () => {
    let result = await userInfoService();
    userInfoStore.setInfo(result.data);
}
getUserInfo();

import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
const router = useRouter();
const handleCommand = (command) => {
    if (command === 'logout') {
        ElMessageBox.confirm(
            '退出登录?',
            'Warning',
            {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning',
            }
        )
            .then(async () => {
                tokenStore.removeToken();
                userInfoStore.removeInfo();

                router.push('/login');
                ElMessage({
                    type: 'success',
                    message: 'log out completed',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'log out canceled',
                })
            })
    } else {
        router.push('/layout/user/' + command);
    }
}
</script>



<template>
    <el-container class="layout-container" >
        <!-- 左侧菜单 -->
        <el-aside width="200px" >
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#97191A" text-color="#fff" router>
                <el-menu-item index="/layout/article/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/layout/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu index="personal-center">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/layout/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/layout/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/layout/user/reset-password">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>MarineDreams：<strong>{{ userInfoStore.info.username }}</strong></div>
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="reset-password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main >
                <router-view />
            </el-main >
            <!-- 底部区域 -->
            <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;
    background: url('@/assets/communismHand.jpg') no-repeat center / cover;
    .el-aside {
        background-color: #97191A;;

        &__logo {
            height: 120px;
            background: url('@/assets/communism_icon.jpg') no-repeat center / cover;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #97191A;
        color: black;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>