<template>
    <a-button type="primary" @click="showDrawer">查询存证</a-button>
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
    <p>查询存证</p>
    <a-input-search
        v-model:value="transactionId"
        placeholder="选择查询的类型并输入对应信息"
        enter-button
        @search="onSearch"
    />
    <div>
    <a-radio-group v-model:value="queryType" @change="handleQueryTypeChange">
      <a-radio :value="type1" checked>proof_id</a-radio>
      <a-radio :value="type2">block_id</a-radio>
    </a-radio-group>
  </div>
    <a-descriptions :column="1" layout="vertical" bordered v-if="hasInfo" >
        <a-descriptions-item label="存证所有者">{{  searchData.username}}</a-descriptions-item>
        <a-descriptions-item label="标题">{{ searchData.title}}</a-descriptions-item>
        <a-descriptions-item label="文件内容">{{  searchData.content}}</a-descriptions-item>
        <a-descriptions-item label="上传时间">{{  searchData.timestamp}}</a-descriptions-item>
        <a-descriptions-item label="上链ID">{{  searchData.proof_id}}</a-descriptions-item>
        <a-descriptions-item label="区块号">{{ searchData.block_num }}</a-descriptions-item>
        <a-descriptions-item label="区块ID">{{ searchData.block_id }}</a-descriptions-item>
        <a-descriptions-item label="交易ID">{{  searchData.transaction_id }}</a-descriptions-item>
        <a-descriptions-item label="数据Hash">{{ searchData.datahash }}</a-descriptions-item>
    </a-descriptions>
</a-drawer>
</template>
<script setup>
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';
import UploadComp from '@/components/UploadComp.vue'
import axios from 'axios';
//抽屉表
const open = ref(false);
const afterOpenChange = bool => {
  if (!bool) {
    resetSearchData();
    console.log(searchData.value) // 当抽屉关闭时重置数据
  }
};
const showDrawer = () => {
open.value = true;
};

const resetSearchData = () => {
  searchData.value = null; // 或者重新初始化为空对象 {}
  open.value = false;      // 关闭抽屉
};
//查询
const type1 = 'proof_id';
const type2 = 'block_id';
const transactionId = ref('');
let searchData = ref([])

const queryType = ref(type1)


const handleQueryTypeChange = (value) => {
    queryType.value = value.target.value;
    console.log('查询类型已更改为:', queryType.value);
};

const  onSearch = async () => {
  try {
    let response;
    if(queryType.value ==='proof_id')
    {
      response = await axios.get(`http://10.122.202.37:3000/transaction/${transactionId.value}`);
    }else {
      response = await axios.get(`http://10.122.202.37:3000/block/${transactionId.value}`)
    }
    console.log(response.data)
    searchData.value = []
    searchData.value = response.data;
  } catch (err) {
    message.error('查询失败')
    console.error(err)
  }
};

let hasInfo = computed(() => {
  return searchData.value !== null && Object.keys(searchData.value).length > 0 && open.value;
});


</script>