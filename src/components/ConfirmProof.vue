<template>
    <a-button type="primary" @click="showDrawer">验证存证</a-button>
        <a-drawer
        v-model:open="open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        style="color: #000"
        title="文件存证"
        placement="right"
        @after-open-change="afterOpenChange"
    >
        <p>验证存证</p>
        <div class="clearfix">
            <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
            <a-button>
            <upload-outlined></upload-outlined>
            选择验证文件
            </a-button>
        </a-upload>
        <a-input v-model:value="proof_id" placeholder="请输入上链ID(proof_id)" />
        <a-button
            type="primary"
            :disabled="fileList.length === 0"
            :loading="uploading"
            style="margin-top: 16px"
            @click="handleUpload"
        >
            {{ uploading ? '验证ing' : '开始验证' }}
        </a-button>
        </div>
    </a-drawer>
</template>
<script setup>
import {ref} from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import CryptoJS from 'crypto-js';
import axios from 'axios';

//抽屉
const open = ref(false);
const afterOpenChange = bool => {
console.log('open', bool);
};
const showDrawer = () => {
open.value = true;
};

//文件上传部分
let fileHash = '';
const proof_id = ref('')
const fileList = ref([]);
const uploading = ref(false);
const handleRemove = file => {
const index = fileList.value.indexOf(file);
const newFileList = fileList.value.slice();
newFileList.splice(index, 1);
fileList.value = newFileList;
};
const beforeUpload = file => {
    fileList.value = [...(fileList.value || []), file];
    return false;
};


const calculateHash = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
        // 将 FileReader 的 result 转换为一个 Blob
        const blob = new Blob([event.target.result]);
        // 使用 FileReader 读取 Blob 为文本
        const readerText = new FileReader();
        readerText.onloadend = function () {
            const text = readerText.result;
            // 使用 crypto-js 计算 SHA-256 哈希
            const hash = CryptoJS.SHA256(text).toString();
            resolve(hash);
        };
        readerText.readAsText(blob);
    };
    reader.onerror = function (error) {
        reject(error);
    };
    // 读取文件为 ArrayBuffer
    reader.readAsArrayBuffer(file);
});

const handleUpload = async () => {
try {
    fileHash = await calculateHash(fileList.value[0]);
    console.log(fileHash)
} catch (error) {
    message.error('Failed to compute file hash.');
    return;
}

axios.post('http://10.122.202.37:3000/check', {
    id: proof_id.value,
    datahash: fileHash,
})
    .then((response) => {
    fileList.value = [];
    uploading.value = false;
    if (response.data.success) {
      message.success('验证成功');
    } else {
      message.error('验证失败');
    }
    })
    .catch(() => {
    uploading.value = false;
    message.error('Upload failed.');
    });
}
</script>