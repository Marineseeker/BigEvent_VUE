// 定制请求的实例

// 导入axios  npm install axios
import { useTokenStore } from '@/stores/token';
import axios from 'axios';
import router from '@/router';
// 定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL });


import { ElMessage } from 'element-plus';
// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.status === 200) {
            // 业务逻辑错误
            if (result.data.code === 1) {
                ElMessage.error(result.data.message);
                return Promise.reject(result.data);
            } else if (result.data.code === 0) {
                // 业务逻辑正常 
                return result.data;
            }
        }
        ElMessage.error(result.data.msg ? result.data.msg : '服务异常');
        return Promise.reject(result.data);
    },
    err => {
        if (err.response.status === 401) {
            ElMessage.error('请登录');
            // 重定向到登录页面
            router.push('/login');
        }else{
            ElMessage.error(err.response.data.msg ? err.response.data.msg : '服务异常');
            return Promise.reject(err); // 异步的状态转化成失败的状态
        }
    }
);
// 添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            // 在请求头中添加token
            config.headers.Authorization = tokenStore.token;
        }
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)

export default instance;