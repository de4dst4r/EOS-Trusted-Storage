<template>
    <div class="container">
        <div class="content">
            <h2>注册</h2>
            <div class="wrapper">
                <input type="text" id="username" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="wrapper">
                <input type="password" id="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="wrapper"> 
                <input type="password" id="checkpassword" placeholder="确认密码" v-model="checkPassword">
            </div>
                <button @click="register">注册</button>
        </div>
        <div class="signup">
            <router-link to="/">返回登录</router-link>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import CryptoJS from 'crypto-js';

//使用axios实例
const axiosInstance = axios.create({
baseURL: 'http://10.122.202.37:3000',
timeout: 10000,
})

const router = useRouter();
const username = ref('');
const password = ref('');
const checkPassword = ref('')
const passwordHash = CryptoJS.SHA256(password).toString();
async function register() {
    try {
        const response = await axiosInstance.post('/register', { username: username.value, passwordHash: passwordHash });
        // 假设服务器返回的数据包含一个success字段
        if (response.data.success) {
            router.push('/login'); // 假设登录成功后跳转到'/登录'路由
        } else {
            alert('注册失败: ' + response.data.message); // 显示错误信息
        }
    } catch (error) {
        console.error('注册请求失败:', error);
        alert('注册请求失败，请稍后重试。');
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

  h2 {
    color: #000;
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
    border-radius: 67% 42% 58% 33%  / 38% 45%;
    transition: 0.5s;


    .wrapper {
        width: 100%;
        border: none;
        outline: none;
        background: #ead4eb;
        opacity: 0.9;
        font-size: 15px;
        padding: 10px 15px;
        margin: 15px;
        border-radius: 10px;
        box-shadow: 
            inset 10px 10px 10px rgba(0,0,0, 0.05),
            25px 35px 20px rgba(0,0,0, 0.05),
            25px 35px 20px rgba(0,0,0, 0.05),
            inset -20px -20px 25px rgba(255,255,255,0.9);
    }

    input {
        background: transparent;
        outline: none;
        border: none;
    }

    button {
        color: #570d88;
        background: rgba(255,255,255,0.8);
        border: none;
        padding: 8px;
        border-radius: 15px;
        cursor: pointer;
    }
    }

    .content:hover {
        border-radius: 50%;
    }

    .content::before {
        content: '';
        position: absolute;
        top: 50px;
        right: 85px;
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
        left: -30%;
        width: 100px;
        height: 100px;
        background: #01b4ff;
        box-shadow: 
        inset 20px -10px 15px rgba(255, 255, 255, 0.6),
        inset 20px 20px 20px rgba(87, 94, 187, 0.08),
        25px 35px 20px rgba(119, 145, 153, 0.05),
        25px 35px 20px rgba(190, 195, 197, 0.05),;
        border-radius: 50% 42% 58% 33%  / 38% 45%;
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