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

export const userInfoUpdateService = (userInfoData)=>{
    return request.put('/user/update', userInfoData)
}

export const userAvatarUpdateService = (avatarUrl)=>{
    const params = new URLSearchParams();
    params.append('avatarUrl', avatarUrl);
    return request.patch('user/updateAvatar', params)
}

export const userPasswordUpdateService = (passwordData)=>{
    return request.patch('/user/updatePwd', passwordData, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export const userSendEmailService = (forgetPwdData)=>{
    const params = new URLSearchParams();
    params.append('emailAddr', forgetPwdData.emailAddr);
    return request.post('/user/sendEmail', params)
}

export const UserForgetPwdService = (resetPwdData)=>{
    return request.post('user/verifyCode', resetPwdData,{
        headers: {'Content-Type': 'application/json' }
    })

}