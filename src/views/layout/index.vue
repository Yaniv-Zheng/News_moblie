<template>
  <div class="page">
    <keep-alive>
    <router-view/>
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/personal">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
 name: 'LayoutIndex',
 components: {},
 props: {},
 data() {
   return {
     active:0
   }
 },
 computed: {},
 watch: {},
 created (){},
 mounted (){
   this.$store.commit('setCachePages','LayoutIndex')
 },
 methods: {}
}
</script>

<style lang="less" scoped>
</style>
