<template>
  <div class="page">
    <van-cell title="历史记录" v-if="searchHistory.length"/>
    <van-cell v-for="(item,index) in searchHistory" :key="index" :title="item" @click="clickItem(item)">
      <template #right-icon>
        <van-icon name="cross" class="search-icon" @click="deleSearch(index)"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHistory } from '@/api/search'
export default {
 name: 'searchHistory',
 components: {},
 props: {
 },
 data() {
   return {
     searchHistory:[]
   }
 },
 computed: {
   ...mapState(['user'])
 },
 watch: {},
 async created (){
   if(this.user){
     const { data } = await getHistory()
     const history = data.data.keywords
     this.searchHistory = history
   }
   const history = JSON.parse(window.localStorage.getItem('searchHistory'))||[]
   this.searchHistory.unshift(...history)
   this.searchHistory = [...new Set(this.searchHistory)]
 },
 mounted (){},
 methods: {
   deleSearch(index){
     event.stopPropagation()
     this.searchHistory.splice(index,1)
     window.localStorage.removeItem('searchHistory')
     window.localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
   },
   clickItem(item){
     this.$emit('clickHistory',item)
   }
 }
}
</script>

<style scoped>
</style>