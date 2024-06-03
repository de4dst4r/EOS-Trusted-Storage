<template>
  <div >
    <AccountInfo></AccountInfo>
        <ItemList></ItemList>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemList from "../components/ItemList.vue"
import AccountInfo from '@/components/AccountInfo.vue';

export default {
  name: 'HomeView',
  components: {
    ItemList,
    AccountInfo,
  }
}
</script>

<style lang="less" scoped>
</style>
