<template>
  <div class="page">
    <van-cell v-for="(item,index) in mineList" :key="index" icon="search" @click="onSearch(index)">
      <div v-html="item"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestion } from '@/api/search'
export default {
 name: 'searchMine',
 components: {},
 props: {
   value:{
     type:String,
     required:true
   }
 },
 data() {
   return {
     mineList:[],
     item:[]
   }
 },
 computed: {},
 watch: {
   value:{
     handler:debounce(async function(){
       const { data } = await getSuggestion(this.value)
       this.mineList = []
       let mineList = data.data.options
       const LENGTH = mineList.length
       for(let i=0;i<LENGTH;i++){
         this.item.push(mineList[i])
         this.mineList.push(mineList[i].replace(eval(`/${this.value}/gi`),`<span style='color:red'>${this.value}</span>`))
       }
     },200),
     immediate:true
   }
 },
 created (){},
 mounted (){},
 methods: {
   onSearch(index){
     this.$emit('mineItem',this.item[index])
   }
 }
}
</script>

<style scoped>
</style>