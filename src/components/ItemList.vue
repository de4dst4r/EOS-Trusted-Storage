<template>
  <div class="container">
  <a-descriptions :title="item.username" :column="4" layout="vertical" bordered v-for="item in currentData" :key="item.id" >
    <a-descriptions-item label="文件标题">{{  item.title }}</a-descriptions-item>
    <a-descriptions-item label="内容描述">{{  item.content }}</a-descriptions-item>
    <a-descriptions-item label="上传时间">{{  item.timestamp}}</a-descriptions-item>
    <a-descriptions-item label="上链ID">{{  item.proof_id}}</a-descriptions-item>
    <a-descriptions-item label="区块ID">{{ item.block_id }}</a-descriptions-item>
    <a-descriptions-item label="交易ID">{{  item.transaction_id }}</a-descriptions-item>
    <a-descriptions-item label="数据Hash">{{ item.datahash }}</a-descriptions-item>
  </a-descriptions>
  <a-button @click="onLoadMore" class="loadMore">loading more</a-button>
</div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useMainStore } from "@/stores/useMainStore";
let proofsData = ref([]);
const mainStore = useMainStore();
let currentCount = ref(5);
let currentData = ref([])
mainStore.fetchProofsData();

onMounted(()=>{
  mainStore.fetchProofsData;
})

proofsData.value = mainStore.proofsData;
currentData.value = proofsData.value.slice(0,currentCount.value)
console.log(currentData)

function onLoadMore() {
  // 更新 currentCount 来加载更多的数据
  currentCount.value += 5;
  // 更新 proofsData 以重新渲染视图
  currentData.value = proofsData.value.slice(0, currentCount.value);
  console.log(currentData.value)
}

/* function isOwn(username){
  if(username === "hello"){
    return 'own'
  }
  return ''
} */



</script>

<style lang="less" scoped>
  // .own{
  //   background: #fff;
  // }
  .loadMore{
    position: absolute;
    left: 50%;
  }
</style>