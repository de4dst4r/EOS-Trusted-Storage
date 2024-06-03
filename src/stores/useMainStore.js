import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useMainStore = defineStore('Main', {
state: () => ({
// 初始状态
userData: [],
proofsData: [],
username: ref('') // 使用 ref 创建响应式数据
}),
actions: {
    // 定义异步操作
    async fetchProofsData() {
        try {
        const response = await axios.get('http://10.122.202.37:3000/proofs');
        this.proofsData = response.data;
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    },
    getUserData(username,public_key,created_at,num){
        this.userData = []
        this.userData.push({username:username,public_key:public_key,created_at:created_at,num:num})
    }
},
persist: true,
});