<template>
  <div class="page">
    <div class="bg_img">
      <img src="./bg.jpg" />
    </div>
    <div class="per_data">
      <van-row>
        <van-col class="per_img" span="8" @click="linkTo">
          <van-image
            round
            width="2rem"
            height="2rem"
            fit="cover"
            :src="user?data.photo:'https://s1.ax1x.com/2020/10/23/BAujIA.png'"
          />
          <div>{{user?data.name:'点击登录'}}</div>
        </van-col>
        <van-col span="16">
          <div class="per_num">
            <van-row>
              <van-col span="6">
                <span>{{user?data.art_count:'━'}}</span>
                <div>发布</div>
              </van-col>
              <van-col span="6">
                <span>{{user?data.fans_count:'━'}}</span>
                <div>粉丝</div>
              </van-col>
              <van-col span="6">
                <span>{{user?data.follow_count:'━'}}</span>
                <div>关注</div>
              </van-col>
              <van-col span="6">
                <span>{{user?data.like_count:'━'}}</span>
                <div>获赞</div>
              </van-col>
            </van-row>
            <div class="per_btn">
              <van-button color="red" plain :disabled="user?false:true">编辑资料</van-button>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="pre_collect">
      <van-row>
        <van-col span="6">
          <i class="iconfont icon-lishijilu"></i>
          <div>历史记录</div>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-shoucang"></i>
          <div>我的收藏</div>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-sixin"></i>
          <div>我的私信</div>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-fuli"></i>
          <div>领取福利</div>
        </van-col>
      </van-row>
    </div>
    <div class="pre_more" >
      <van-cell title="消息通知" is-link to="index" icon="comment-o"></van-cell>
      <van-cell title="联系客服" is-link to="index" icon="service-o"/>
      <van-cell title="设置" is-link to="index" icon="setting-o"/>
    </div>
    <van-button class="pre_quit" v-if="user" @click="quitLogin">退出登录</van-button>
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
import { removeStorage } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
 name: 'PersonalIndex',
 components: {},
 props: {},
 data() {
   return {
     data:{}
   }
 },
 computed: {
   ...mapState(['user'])
 },
 watch: {},
 created (){
   if(this.user){
     this.loadGetUsers()
   }
 },
 mounted (){},
 methods: {
   linkTo(){
     this.user?null:this.$router.push('login')
   },
   quitLogin(){
     removeStorage('user')
     this.$store.commit('setUsers',null)
     removeStorage('img')
     this.$store.commit('removeCachePages','LayoutIndex')
   },
   async loadGetUsers(){
     const {data} = await getUsers()
     const data_img = data.data.photo
     this.data = data.data
     window.localStorage.setItem('img',JSON.stringify(data_img))
   }
 }
}
</script>

<style lang="less" scoped>
  .bg_img{
    width: 100%;
    height: 120px;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
    }
  }
  .per_data{
    background-color: #fff;
    text-align: center;
    .per_img{
      margin-top: -15px;
      font-size: 16px;
      font-weight: 700;
      .van-image{
        border: 2px solid #fff;
      }
    }
    .per_num{
      font-size: 13px;
      width: 100%;
      padding: 20px 0;
      .van-col{
        height: 15px;
        display: flex;
        flex-direction:column;
        justify-content: center;
        border-right: 1px solid rgb(184, 184, 184);
        &:last-child{
          border-right:none;
        }
        span{
          font-weight: 600;
        }
        div{
          color: rgb(104, 104, 104);
        }
      }
      .per_btn{
        width: 100%;
        margin-top: 21px;
        .van-button{
          width: 86%;
          height: 30px;
        }
      }
    }
  }
  .pre_collect{
    margin-top: 5px;
    padding-bottom: 5px;
    background-color: #fff;
    .van-col{
      text-align: center;
      i{
        font-size: 25px;
        color: #4e8dcc;
      }
      div{
        font-size: 12px;
      }
    }
  }
  .pre_more{
    margin-top: 5px;
    .van-cell{
      font-size: 13px;
    }
  }
  .pre_quit{
    margin-top: 5px;
    width: 100%;
    color: red;
    font-size: 13px;
  }
</style>