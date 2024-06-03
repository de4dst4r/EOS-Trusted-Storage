<template>
<a-button type="primary" @click="showDrawer">上链</a-button>
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
    <p>文件存证</p>
    <UploadComp></UploadComp>
</a-drawer>
</template>
<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import UploadComp from '@/components/UploadComp.vue'
import { UploadOutlined } from '@ant-design/icons-vue';
//抽屉表
const open = ref(false);
const afterOpenChange = bool => {
console.log('open', bool);
};
const showDrawer = () => {
open.value = true;
};

</script>