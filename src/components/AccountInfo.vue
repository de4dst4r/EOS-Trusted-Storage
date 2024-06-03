<template>
  <div>
    <a-page-header
      class="demo-page-header"
      style="border: 1px solid rgb(235, 237, 240)"
      title="当前用户信息"
      @back="() => $router.go(-1)"
    >
      <template #extra>
        <UploadDrawer></UploadDrawer>
        <SearchInfo></SearchInfo>
        <ConfirmProof></ConfirmProof>
      </template>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="用户名">{{userData.username}}</a-descriptions-item>
        <a-descriptions-item label="用户标识">{{userData.public_key}}</a-descriptions-item>
        <a-descriptions-item label="创建日期">{{ userData.created_at }}</a-descriptions-item>
        <a-descriptions-item label="用户存证数量">
          {{ userData.num }}
        </a-descriptions-item>
      </a-descriptions>
    </a-page-header>
    <br />
  </div>
</template>

<script setup>
import  UploadDrawer  from "../components/UploadDrawer.vue";
import SearchInfo from "../components/SearchInfo.vue"
import ConfirmProof from '../components/ConfirmProof.vue'
import { useMainStore } from "@/stores/useMainStore";

let userData = []
const mainstore = useMainStore();

userData = mainstore.userData[0];

</script>

<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
</style>