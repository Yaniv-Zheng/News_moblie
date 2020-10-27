<template>
  <div class="page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
import { Toast } from 'vant';
export default {
 name: 'searchResult',
 components: {},
 props: {
   value:{
     type:String,
     required:true
   }
 },
 data() {
   return {
    list: [],
    loading: false,
    finished: false,
    isLoading: false,
    page:1,
    per_page:10
   }
 },
 computed: {},
 watch: {},
 created (){},
 mounted (){},
 methods: {
   async onLoad() {
     const { data } = await getResult({
       page:this.page,
       per_page:this.per_page,
       q:this.value
     })
     const {results} = data.data
     const {total_count} = data.data
     this.list.push(...results)
     this.loading = false
     if(this.loading&&this.list.length){
      this.page++
     }else{
       this.finished = true;
     }
    },
 }
}
</script>

<style lang="less" scoped>
</style>