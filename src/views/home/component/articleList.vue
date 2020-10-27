<template>
  <div class="page" ref="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadGetArticles"
      >
      <van-cell v-for="(item,index) in list" :key="index" center :title="item.title" @click="$router.push(`/article/${item.art_id}`)">
        <div slot="label">
          <div class="img_much" v-if="item.cover.type === 3">
            <van-image v-for="(img,index) in item.cover.images" :key="index" width="116" height="73" :src="img" />
          </div>
          <div class="van-cell-bottom">
            <span class="iconfont icon-wode">{{item.aut_name}}</span>
            <span class="iconfont icon-pinglun"> {{item.collect_count}}</span>
            <span class="time">{{ item.pubdate | relativeTime }}</span>
          </div>
        </div>
        <van-image v-if="item.cover.type === 1" width="116" height="73" :src="item.cover.images[0]" />
      </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getArticles } from '@/api/article'
import { Toast } from 'vant'
export default {
 name: 'articleIndex',
 components: {},
 props: {
   channel:{
     type:Object,
     required:true
   }
 },
 data() {
   return {
    list: [],
    loading: false,
    finished: false,
    refreshing: false,
    timestamp:null,
    scrollTop:0
   }
 },
 computed: {},
 watch: {},
 created (){
 },
 mounted (){
   const articleList = this.$refs['article-list']
   articleList.onscroll = debounce(()=>{
     this.scrollTop = articleList.scrollTop
   },50)
 },
 activated(){
   const articleList = this.$refs['article-list']
   articleList.scrollTop = this.scrollTop
 },
 methods: {
   async loadGetArticles(){
     const { data } = await getArticles({
       channel_id:this.channel.id,
       timestamp:this.timestamp || Date.now(),
       with_top:1
     })
     if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.list.push(...data.data.results)
      this.loading = false;
      if (this.list.length) {
        this.timestamp = data.data.pre_timestamp
      }else{
        this.finished = true;
      }
   },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.loadGetArticles();
    },
 }
}
</script>

<style lang="less" scoped>
 .page{
   width: 100vw;
   position: fixed;
   left: 0;
   right: 0;
   top: 110px;
   bottom: 50px;
   overflow-y: auto;
   .van-cell{
     .iconfont{
       font-size: 12px;
     }
     .img_much{
       display: flex;
       justify-content: space-between;
       margin-bottom: 10px;
     }
     .van-cell-bottom{
       font-size:12px;
       .icon-pinglun{
         padding:0 12px;
       }
     }
   }
 }
</style>