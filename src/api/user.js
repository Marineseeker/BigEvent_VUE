import request from '@/utils/request.js'

export const userRegisterService = (registerData) =>{
    return request.post('/user/register', registerData, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export const userLoginService = (loginData) =>{
    // const params = new URLSearchParams();
    // for(let key in loginData){
    //     params.append(key, loginData[key]);
    // }
    // return request.post('user/login', params)
    return request.post('/user/login', loginData, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export const userInfoService = () =>{
    return request.get('/user/userInfo');
}