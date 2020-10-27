<template>
  <div class="page">
    <div class="label_top">
      <span>频道</span>
    </div>
    <div class="label_title">
      <div><p>我的频道</p></div>
      <div @click="editChannel" v-if="!dele_change"><span>编辑</span><span class="iconfont icon-bianji"></span></div>
      <div @click="editChannel" v-if="dele_change"><span>完成</span></div>
    </div>
    <div class="label_body">
      <div v-for="(item,index) in label_list" :key="index" @click="closeList(index)"><van-icon name="clear" v-show="dele_change" v-if="index>0" @click="removeLabel(index)"/><span :style="active===index?'color:red':null">{{ item.name }}</span></div>
    </div>
    <div class="label_more">
      <div class="label_title">
        <div><p>频道推荐</p><span>选择标签点击添加</span></div>
      </div>
      <div class="label_body">
        <div v-for="(item,index) in rec_channels" :key="index" @click="addChannel(item)">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getChannels } from '@/api/article'
import { setChannels,delteChannels } from '@/api/user'
export default {
 name: 'labelList',
 components: {},
 props: {
   label_list:{
     type:Array,
     required:true
   },
   active:{
     type:Number,
     required:true
   },
   show:{
     type:Boolean,
     require:true
   }
 },
 data() {
   return {
     channels:[],
     dele_change:false
   }
 },
 computed:{
   ...mapState(['user']),
   rec_channels(){
     return this.channels.filter(item =>{
       return !this.label_list.find(v =>{
         return item.id === v.id
       })
     })
   }
 },
 watch: {
   show(){
     this.dele_change=false
   }
 },
 created (){
   this.loadGetChannels()
 },
 mounted (){
 },
 methods: {
   async loadGetChannels(){
       const {data} = await getChannels()
       this.channels = data.data.channels
   },
   async addChannel(item){
     this.label_list.push(item)
     if(this.user){
      await setChannels({channels:[{id:item.id,seq:this.label_list.length}]})
     }else{
       window.localStorage.setItem('label',JSON.stringify(this.label_list))
     }
   },
   editChannel(){
     this.dele_change = !this.dele_change
   },
   async removeLabel(index){
     if(index<this.active){
       this.$emit('updateList',this.active-1)
     }
     if(!this.user){
       index === 0 ?null:this.label_list.splice(index,1)
       window.localStorage.removeItem('label')
       window.localStorage.setItem('label',JSON.stringify(this.label_list))
     }else{
       await delteChannels(this.label_list[index].id)
       index === 0 ?null:this.label_list.splice(index,1)
     }
     
   },
   closeList(index){
     if(this.dele_change === false){
       this.$emit('updateList',index)
       this.$emit('close')
     }
   }
 }
}
</script>

<style lang="less" scoped>
  .label_top{
    width: 100%;
    line-height: 40px;
    text-align: center;
    position: fixed;
    top:0;
    background-color: #fff;
    border-bottom: 1px solid rgb(228, 228, 228);
    span{
      font-size: 16px;
    }
  }
  .label_title{
    width: 92%;
    height: 25px;
    margin-left: 4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgb(228, 228, 228);
    padding-top: 20px;
    margin-top: 42px;
    p{
      font-size: 16px;
      font-weight: 600;
      padding: 4px;
      display: inline-block;
      color: rgb(0, 0, 0);
      border-radius: 3px;
    }
    span{
      font-size: 15px;
      color: rgb(68, 68, 68);
    }
  }
  .label_body{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    margin-top: 15px;
    div{
      width: 75px;
      height: 35px;
      font-size: 14px;
      border-radius: 3px;
      background-color: rgb(245, 245, 245);
      margin-top: 10px;
      margin-left: 15px;
      text-align: center;
      line-height: 35px;
      position: relative;
      .van-icon{
        position: absolute;
        right: -5px;
        top:-5px;
        font-size: 20px;
      }
    }
  }
  .label_more{
    margin-top: 20px;
    .label_title{
      span{
        font-size: 13px;
        margin-left: 10px;
        color: rgb(66, 66, 66);
      }
    }
    .label_body{
      margin-bottom: 20px;
      div{
       background-color:rgb(245, 245, 245);
      }
    }
  }
</style>