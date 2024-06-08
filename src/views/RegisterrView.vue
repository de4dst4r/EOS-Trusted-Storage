<template>
    <div class="background"></div>
    <div class="container">
        <div class="item">
            <h2 class="logo"><i class="bx bxl-xing"></i>Bupt</h2>
            <div class="text-item">
                <h2>Welcome! <br /><span> EOS Trusted Platform </span></h2>
                <p>想要有一个存证平台来进行数据存证吗，欢迎使用</p>
                <div class="social-icon">
                    <a href="#"><i class="bx bxl-facebook"></i></a>
                    <a href="#"><i class="bx bxl-twitter"></i></a>
                    <a href="#"><i class="bx bxl-youtube"></i></a>
                    <a href="#"><i class="bx bxl-instagram"></i></a>
                    <a href="#"><i class="bx bxl-linkedin"></i></a>
                </div>
            </div>
        </div>
        <div class="login-section">
            <div class="form-box login">
                <div>
                    <h2>注册</h2>
                    <div class="input-box">
                        <span class="icon"
                            ><i class="bx bxs-envelope"></i
                        ></span>
                        <input type="text" v-model="username" />
                        <label>用户名</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"
                            ><i class="bx bxs-lock-alt"></i
                        ></span>
                        <input type="password" v-model="password" />
                        <label>密码</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"
                            ><i class="bx bxs-lock-alt"></i
                        ></span>
                        <input type="password" v-model="checkPassword" />
                        <label>确认密码</label>
                    </div>
                    <button class="btn" @click="register">注册</button>
                    <div class="create-account">
                        <p>
                            <router-link to="/login"
                                >Have an account? 登录</router-link
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import CryptoJS from 'crypto-js'

//使用axios实例
const axiosInstance = axios.create({
    baseURL: 'http://10.122.202.37:3000',
    timeout: 10000
})

const router = useRouter()
const username = ref('')
const password = ref('')
const checkPassword = ref('')
const passwordHash = CryptoJS.SHA256(password).toString()
async function register() {
    try {
        const response = await axiosInstance.post('/register', {
            username: username.value,
            passwordHash: passwordHash
        })
        // 假设服务器返回的数据包含一个success字段
        if (response.data.success) {
            router.push('/login') // 假设登录成功后跳转到'/登录'路由
        } else {
            alert('注册失败: ' + response.data.message) // 显示错误信息
        }
    } catch (error) {
        console.error('注册请求失败:', error)
        alert('注册请求失败，请稍后重试。')
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,500&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'poppins', sans-serif;
}
body {
    height: 100vh;
    width: 100%;
    background: #000;
}
.background {
    background-image: url(../assets/images/bg4.jpg);
    /* 背景图片不重复 */
    background-repeat: no-repeat;
    /* 背景图片居中 */
    background-position: center;
    /* 背景图片覆盖整个元素 */
    background-size: cover;
    /* 确保最小高度为视口高度 */
    min-height: 100vh;
}
.container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 550px;
    margin-top: 20px;
    background: url(../assets/images/bg4.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    overflow: hidden;
}
@keyframes slideInRev {
    from {
        transform: translateX(-100%); /* 从屏幕右侧开始 */
        opacity: 0; /* 初始状态不透明 */
    }
    to {
        transform: translateX(0); /* 移动到正常位置 */
        opacity: 1; /* 结束状态完全可见 */
    }
}
.item {
    position: absolute;
    top: 0;
    left: 0;
    width: 58%;
    height: 100%;
    color: #fff;
    background: transparent;
    padding: 80px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    animation-name: slideInRev;
    /* 动画持续时间 */
    animation-duration: 1s;
    /* 动画延迟时间 */
    animation-delay: 0s;
    /* 动画填充模式 */
    animation-fill-mode: forwards;
    /* 防止动画在滚动时重置 */
    backface-visibility: hidden;
}
.item .logo {
    color: #fff;
    font-size: 30px;
}
.text-item h2 {
    font-size: 40px;
    line-height: 1;
}
.text-item p {
    font-size: 16px;
    margin: 20px 0;
}
.social-icon a i {
    color: #fff;
    font-size: 24px;
    margin-left: 10px;
    cursor: pointer;
    transition: 0.5s ease;
}
.social-icon a:hover i {
    transform: scale(1.2);
}
.container .login-section {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - 58%);
    height: 100%;
    color: #fff;
    backdrop-filter: blur(10px);
}

.login-section .form-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* 应用动画名称 */
    animation-name: slideIn;
    /* 动画持续时间 */
    animation-duration: 1s;
    /* 动画延迟时间 */
    animation-delay: 0s;
    /* 动画填充模式 */
    animation-fill-mode: forwards;
    /* 防止动画在滚动时重置 */
    backface-visibility: hidden;
}
.login-section .form-box.register {
    transform: translateX(430px);
    transition: transform 0.6s ease;
    transition-delay: 0s;
}
.login-section.active .form-box.register {
    transform: translateX(0px);
    transition-delay: 0.7s;
}

.login-section .form-box.login {
    transform: translateX(0px);
    transition: transform 0.6s ease;
    transition-delay: 0.7s;
}
.login-section.active .form-box.login {
    transform: translateX(430px);
    transition-delay: 0s;
}

.login-section .form-box h2 {
    text-align: center;
    font-size: 25px;
}

.form-box .input-box {
    width: 340px;
    height: 50px;
    color: #fff;
    border-bottom: 2px solid#fff;
    margin: 30px 0;
    position: relative;
}
@keyframes slideIn {
    from {
        transform: translateX(100%); /* 从屏幕右侧开始 */
        opacity: 0; /* 初始状态不透明 */
    }
    to {
        transform: translateX(0); /* 移动到正常位置 */
        opacity: 1; /* 结束状态完全可见 */
    }
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    padding-right: 28px;
}
.input-box label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 16px;
    font-weight: 600px;
    pointer-events: none;
    transition: 0.5s ease;
}
.input-box .icon {
    position: absolute;
    top: 13px;
    right: 0;
    font-size: 19px;
}
.input-box input:focus ~ label,
.input-box input:valid ~ label {
    top: -5px;
}
.remember-password {
    font-size: 14px;
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
}
.remember-password label input {
    accent-color: #fff;
    margin-right: 3px;
}
.remember-password a {
    color: #fff;
    text-decoration: none;
}
.remember-password a:hover {
    text-decoration: underline;
}
.btn {
    background: #fff;
    width: 100%;
    height: 45px;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #4081e2;
    font-size: 16px;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.4);
}

.create-account {
    position: absolute;
    bottom: 30px;
    left: 30%;
    font-size: 14.5px;
    text-align: center;
    margin: 25px;
}
.create-account p a {
    color: #fff;
    font-weight: 600px;
    text-decoration: none;
}
.create-account p a:hover {
    text-decoration: underline;
}
</style>