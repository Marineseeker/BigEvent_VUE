import { useTokenStore } from '@/stores/token';
import request from '@/utils/request';

export const articleCategoryList = () => {
    const tokenStore = useTokenStore(); // 确保正确调用 store
    const token = tokenStore.token; // 防止 token 未初始化
    if (!token) {
        console.warn('Token is empty. Please login first.');
        return Promise.reject('Token is missing.');
    }
    return request.get('/category', { headers: { token } });
};
