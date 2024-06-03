<template>
<div class="clearfix">
    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
    <a-button>
        <upload-outlined></upload-outlined>
        选择文件
    </a-button>
    </a-upload>
    <a-space direction="vertical">
        <a-input v-model:value="title" placeholder="请输入标题" />
        <a-textarea
        v-model:value="content"
        placeholder="请输入文件内容"
        :auto-size="{ minRows: 2, maxRows: 5 }"
    />
    </a-space>
    <div>
        <a-button
    type="primary"
    :disabled=isDisable
    :loading="uploading"
    style="margin-top: 16px"
    @click="handleUpload"
    >
    {{ uploading ? '上传中' : '开始上传' }}
    </a-button>
    </div>
    <template v-if="notification.proof_id">
        <a-result
        status="success"
        title="成功上链"
        sub-title="请妥善保存存证信息"
        class="result"
        >
        <template #extra>
            <div >
                <div>Proof ID: {{ notification.proof_id }}</div>
                <div>Block ID: {{ notification.block_id }}</div>
                <!-- <div>Block ID: {{ notification.data_hash }}</div> -->
            </div>
            <a-button class="copy-button" key="console" type="primary" @click="copyToClipboard(`proof_id:${notification.proof_id}  block_id:${notification.block_id}`)">一键复制</a-button>
        </template>
    </a-result>
    </template>
    
</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message, } from 'ant-design-vue';
import CryptoJS from 'crypto-js';
import { useMainStore } from "@/stores/useMainStore";
import axios from 'axios';
import ClipboardJS from 'clipboard';
const mainstore = useMainStore();
//上传组件变量声明
// 输入框
const title = ref('');
const content = ref('');
// 上传
const fileList = ref([]);
const uploading = ref(false);
let user = mainstore.userData[0].username;
let isDisable = ref(false);
let fileHash = '';
//通知栏
let notification = ref([])


isDisable = computed(() => {
    return !(title.value !== '' && content.value !== '' && fileList.value.length > 0 );
})

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
} catch (error) {
    message.error('Failed to compute file hash.');
    return;
}


uploading.value = true;

try {
        const response = await axios.post('http://10.122.202.37:3000/upload', {
            user: user,
            title: title.value,
            content: content.value,
            datahash: fileHash,
        });
        // 清空文件列表和上传状态
        fileList.value = [];
        uploading.value = false;
        notification.value = response.data
        await this.$nextTick();
        // 显示成功消息
        // message.success('上链成功');
        // 使用 Result 组件显示结果
      } catch (error) {
        uploading.value = false;
        // message.error('上链失败');
      }
};


//一键复制
const copyToClipboard = function(text) {

      const clipboard = new ClipboardJS('.copy-button', {
        text: () => text
      });

      clipboard.on('success', () => {
        message.success('复制成功');
        clipboard.destroy(); // 复制成功后销毁实例
      });

      clipboard.on('error', (e) => {
        message.error('复制失败，请手动复制');
        clipboard.destroy(); // 出错后也销毁实例
        });
    }

</script>

<style scoped>
.result{
    max-width: 350;
    word-wrap: break-word;
}
</style>