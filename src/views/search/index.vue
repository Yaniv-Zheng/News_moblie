<template>
  <div class="page">
    <div class="search_box">
      <form action="/">
        <van-search
          show-action
          placeholder="搜索"
          v-model="value"
          @search="search"
          @input="onClick"
          @cancel="$router.back()"
        />
      </form>
    </div>
    <!-- 搜索联想 -->
    <search-mine v-if="isMine" :value="value" @mineItem="mineItem" />
    <!-- 搜索结果 -->
    <search-result v-else-if="value" :value="value"/>
    <!-- 历史记录 -->
    <searchHistory v-else :searchHistory="searchHistory" @clickHistory="clickHistory"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import searchResult from './component/search_result'
import searchHistory from './component/search_history'
import searchMine from './component/search_mine'
export default {
 name: 'searchIndex',
 components: {
   searchMine,
   searchHistory,
   searchResult
 },
 props: {},
 data() {
   return {
     isMine:false,
     value:'',
     searchHistory:[]
   }
 },
 computed: {
   ...mapState(['user'])
 },
 watch: {
  
 },
 created (){
   this.searchHistory = JSON.parse(window.localStorage.getItem('searchHistory'))||[]
 },
 mounted (){},
 methods: {
   addHistory(){
     if(this.searchHistory){
       const index = this.searchHistory.indexOf(this.value)
        if(index!==-1){
          this.searchHistory.splice(index,1)
        }
        this.searchHistory.unshift(this.value)
        window.localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
     }
   },
   search(){
    this.isMine=false
    this.addHistory()
   },
   onClick(){
    if(this.value===''){
      this.isMine=false
     }else{
      this.isMine=true
     }
   },
   mineItem(item){
     this.value = item
     this.isMine=false
     this.addHistory()
   },
   clickHistory(item){
     this.value = item
     this.isMine=false
     this.addHistory()
   }
 }
}
</script>

<style lang="less" scoped>
  /deep/.van-list{
    position: fixed;
    left: 0;
    right: 0;
    top:55.2px;
    bottom: 0;
    overflow-y: auto;
  }
</style>