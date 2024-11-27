import { useTokenStore } from '@/stores/token';
import request from '@/utils/request';

export const articleCategoryList = () => {
    // const tokenStore = useTokenStore();
    // const token = tokenStore.token;  // 获取 token

    // // 检查 token 是否为空
    // if (!token) {
    //     console.warn('Token is empty. Please login first.');
    //     return Promise.reject('Token is missing.');
    // }

    // // 使用 Authorization 请求头传递 Token，采用 Bearer <token> 格式
    return request.get('/category');
};
                                                
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category', categoryData)
}

export const updateCategoryService = (categoryData)=>{
    return request.put('/category', categoryData)
}

export const deleteCategoryService = (id)=>{
    return request.delete(`/category?id=${id}`)
}