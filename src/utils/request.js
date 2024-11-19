// 定制请求的实例

// 导入axios  npm install axios
import axios from 'axios';
// 定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL });

import { ElMessage } from 'element-plus';
// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.status === 200) {
            if (result.data.code === 1) {
                ElMessage.error(result.data.message);
                return Promise.reject(result.data);
            }else if (result.data.code === 0) {
                return result.data;
            }
            return result.data;
        }
        return Promise.reject(result.data);
    },
    err => {
        ElMessage.error(err.response.data.msg ? err.response.data.msg : '服务异常');
        return Promise.reject(err); // 异步的状态转化成失败的状态
    }
);

export default instance;