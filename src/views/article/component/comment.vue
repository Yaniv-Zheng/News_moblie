<template>
  <div class="page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell>全部评论</van-cell>
      <van-cell v-for="(item,index) in list" :key="index">
        <van-row>
          <van-col span="4">
            <van-image
              round
              width="1rem"
              height="0.93rem"
              :src="item.aut_photo"
            />
          </van-col>
          <van-col span="18">
            <div style="font-size:17px">{{item.aut_name}}</div>
            <div style="font-size:15px">{{item.content}}</div>
            <div style="font-size:13px;display:flex;align-items:center"><span>{{ item.pubdate | datatime }}</span><van-icon name="chat-o" size="20px" style="padding-left:10px"/></div>
          </van-col>
          <van-col span="2">
            <van-icon name="good-job-o" size="20px" style="margin-top:10px"/>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
 name: 'CommentIndex',
 components: {},
 props: {
   articleId:{
     type:[String,Number,Object],
     required:true
   },
   newText:{
     type:Object,
     required:true
   }
 },
 data() {
   return {
    list: [],
    loading: false,
    finished: false,
    offset:null,
    limit:10
   }
 },
 computed: {},
 watch: {
   newText:{
      handler(val){
        this.list.unshift(val)
      },
      deep:true
   }
 },
 created (){},
 mounted (){},
 methods: {
   async onLoad() {
     const { data } = await getComments({
       type:'a',
       source:this.articleId,
       offset:this.offset,
       limit:this.limit,
     })
     this.$emit('total_count',data.data.total_count)
     this.list.push(...data.data.results)
     this.loading = false
     if(this.list.length<data.data.total_count) {
       this.offset = data.data.last_id
     }else{
       this.finished = true
     }
   },
 }
}
</script>

<style lang="less" scoped>
  .van-list{
    width: 94%;
    margin-left: 3%;
    margin-top: 20px;
    margin-bottom: 30px;
  }
</style>