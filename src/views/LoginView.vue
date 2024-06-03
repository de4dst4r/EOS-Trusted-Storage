<template>
<div class="container">
    <div class="content">
        <h2>登录</h2>
        <div class="wrapper1">
            <input type="text" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="wrapper2">
            <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <button @click="login">登录</button>
    </div>
    <div class="signup">
        <router-link to="/register">注册</router-link>
    </div>
</div>

</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import CryptoJS from 'crypto-js';

import { useMainStore } from '@/stores/useMainStore';
const router = useRouter();
const username = ref('');
const password = ref('');
const passwordHash = CryptoJS.SHA256(password).toString();
const mainstore = useMainStore()

//发送登陆请求
async function login() { 
    try {
        console.log(password.value)
        const response = await axios.post("http://10.122.202.37:3000/login", {
        username: username.value, passwordHash: passwordHash  // 发送输入框的值
    }, {
    headers: {
    'Content-Type': 'application/json'  // 设置请求头
    }});
    if(response.data){
        let data = response.data;
        mainstore.getUserData(data.username, data.public_key, data.created_at,data.num)
        console.log(mainstore.userData)
        router.push({ name: 'home' });
    }
console.log("登录成功");
} catch (error) {
console.error('发送数据时出错:', error);
}
}
</script>

<style lang="less" scoped>
.container {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 470px;
    margin: 250px auto;
    h2{
        color: rgba(129, 126, 126, 0.9);
    }
    .content {
    background: #eff0f4;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 350px;
    height: 350px;
    padding: 60px;
    box-shadow: 
    inset 20px 20px 20px rgba(0,0,0, 0.05),
    25px 35px 20px rgba(0,0,0, 0.05),
    25px 35px 20px rgba(0,0,0, 0.05),
    inset -20px -20px 25px rgba(255,255,255,0.9);
    border-radius: 52% 48% 33% 67% / 38% 45%;
    transition: 0.5s;
    


    .wrapper {
        position: relative;
        width: 225px;
        border-radius: 25px;
        box-shadow: inset 2px 5px 10px rgba(0,0,0,0.1),
        inset -2px -5px -10px rgba(255,255,255,1),
        15px 15px 10px rgba(0,0,0, 0.05),
        15px 10px 15px rgba(0,0,0,0.025)
        ;
    }
    .wrapper1::after{
        content: "";
        position: absolute;
        bottom: 64%;
        left: 55%;
        transform: translateX(-50%);
        width: 55%;
        height: 5px;
        background: #fff;
        opacity: 0.4;
        border-radius: 10px;
    }
    .wrapper2::after{
        content: "";
        position: absolute;
        bottom: 42%;
        left: 55%;
        transform: translateX(-50%);
        width: 55%;
        height: 5px;
        background: #fff;
        opacity: 0.4;
        border-radius: 10px;
    }
    

    input {
        width: 100%;
        border: none;
        outline: none;
        background: rgba(5, 39, 174, 0.938);
        opacity: 0.9;
        font-size: 15px;
        padding: 15px 15px;
        color: #000;
        margin: 15px;
        border-radius: 20px;
    }

    button {
        width: 120px;
        color: #fff;
        background: rgba(5, 39, 174, 0.938);
        border: none;
        padding: 8px;
        border-radius: 15px;
        box-shadow: inset 2px 5px 10px rgba(0,0,0,0.1),
        15px 15px 10px rgba(0,0,0,0.05)
        15px 10px 15px rgba(0,0,0,0.025)
        ;
        opacity: 0.9;
        transition: 0.5s;
        cursor: pointer;
    }

    button::after {
        content: '';
        position: absolute;
        height: 5px;
        width: 90px;
        left: 37%;
        background: #fff;
        border-radius: 10px;
        opacity: 0.4;
    }
    }

    .content:hover {
        border-radius: 50%;
    }

    .content::before {
        content: '';
        position: absolute;
        top: 50px;
        left: 85px;
        width: 35px;
        height: 35px;
        background: #fff;
        border-radius: 50%;
        opacity: 0.9;
    }

    .signup{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: -30%;
        left: 67%;
        width: 120px;
        height: 120px;
        background: #1435ee;
        box-shadow: inset 10px 10px 10px rgba(35, 122, 223, 0.05),
        15px 25px 10px rgba(13, 116, 142, 0.1),
        15px 20px 20px rgba(39, 72, 236, 0.1),
        inset -10px -10px 15px rgba(255, 255, 255, 0.5);
        
        border-radius: 44%  56% 65%  35%  / 57% 58% 42% 43% ;
        transition: 0.5s;
        
        a {
            text-decoration: none;
            color: #fff;
        }
    }

    .signup:hover {
        border-radius: 50%;
    }

}

</style>