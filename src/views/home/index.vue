<template>
  <div class="page">
    <div class="home_top">
      <van-row>
        <van-col span="4">
          <van-image
            round
            fit="cover"
            width="1rem"
            height="1rem"
            :src="data_img?data_img:'https://s1.ax1x.com/2020/10/23/BAujIA.png'"
          />
        </van-col>
        <van-col span="20">
          <van-search placeholder="搜索" @click="toSearch"/>
        </van-col>
      </van-row>
      <div class="home_nav">
        <van-tabs swipeable v-model="active"> 
          <van-tab v-for="item in channels" :title="item.name" :key="item.id">
            <article-list :channel ="item"/>
          </van-tab>
        </van-tabs>
        <div class="iconfont icon-ziyuan" @click="popup_isShow"></div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" closeable :style="{ height: '100%' }" title="频道">
      <label-list :label_list="channels" :show="show" @close="show=false" @updateList="updateList" :active="active"/>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getChannels } from '@/api/user'
import articleList from './component/articleList'
import labelList from './component/labelList'
export default {
 name: 'HomeIndex',
 components: {
   articleList,
   labelList
 },
 props: {},
 data() {
   return {
     data_img:"",
     active:0,
     channels:[],
     show:false
   }
 },
 computed: {
   ...mapState(['user'])
 },
 watch: {
 },
 created (){
   this.loadGetChannels()
   this.getImg()
 },
 mounted (){},
 methods: {
   async loadGetChannels(){
     const {data} = await getChannels()
     if(!this.user){
      const label = JSON.parse(window.localStorage.getItem('label'))
      label?this.channels = label:this.channels = data.data.channels
     }else{
       this.channels = data.data.channels
     }
   },
   popup_isShow(){
     this.show=true
   },
   getImg(){
    this.data_img = JSON.parse(window.localStorage.getItem('img'))
   },
   updateList(index){
     this.active = index
   },
   toSearch(){
     this.$router.push('search')
   }
 }
}
</script>

<style lang="less" scoped>
  /deep/.van-popup__close-icon--top-right{
    position: fixed;
  }
  .home_top{
    width: 100%;
    background-color: #fff;
    height: 110px;
    .van-col{
      text-align: center;
      .van-image{
        padding: 8px 0;
      }
    }
    .home_nav{
      display: flex;
      .van-tabs{
        width: 90%;
      }
      .icon-ziyuan{
        background-color: #fff;
        height: 25px;
        line-height: 25px;
        margin-left: -5px;
        position: relative;
        margin-top: 10px;
        z-index: 1;
        padding-left: 10px;
        border-left: 1px solid rgb(150, 150, 150);
      }
    }
  }
</style>
