<template>
  <div class="page">
    <div class="navBar">
      <van-nav-bar
      title="手机号登录注册"
      left-arrow
      @click-left="$router.back()"
      />
    </div>
    <div class="login_logo">
      <img src="./logo.png"/>
    </div>
    <div class="login_form">
      <van-form @submit="onSubmit" ref="login_form">
        <van-field
          v-model="user.mobile"
          center
          name="mobile"
          placeholder="手机号"
          icon-prefix="iconfont icon"
          left-icon="shouji"
          :rules="rules.mob"
        >
          <template #button>
            <van-button size="small" v-if="display" :loading="loading" loading-text="马上..." @click.prevent="onSendSms">发送验证码</van-button>
            <van-count-down v-else :time="time" format="ss s" @finish="onfinish"/>
          </template>
        </van-field>
        <van-field
          icon-prefix='iconfont icon'
          left-icon="yanzhengma1"
          v-model="user.code"
          type="password"
          name="code"
          placeholder="验证码"
          :rules="rules.cod"
        />
        <div style="margin: 16px;">
          <van-button :disabled="disabled" type="danger" size="large" native-type="submit">验证登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="login_attention">
      <p>未注册或未绑定明日头条的手机号，将帮你注册新账号</p>
      <p>登录即代表你同意<span>用户协议</span>和<span>隐私政策</span></p>
      <p>遇到问题？<span>查看帮助</span></p>
    </div>
  </div>
</template>

<script>
import { login,sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
 name: 'LoginIndex',
 components: {},
 props: {},
 data() {
   return {
     pattern:/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
     pattern2:/^\d{6}$/,
     disabled:true, //登录键禁用
     user:{
       mobile:null,
       code:null
     },
     rules:{
       mob:[{required:true},{ pattern:/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,required:true, message: '请输入正确的手机号~' }],
       cod:[{required:true},{ pattern:/^\d{6}$/, message: '请输入正确的验证码~' }]
     },
     time:60 * 1000,
     display:true,
     loading:false
   }
 },
 computed: {},
 watch: {
   user:{
     handler(val){
       const pattern = !this.pattern.test(val.mobile)
       const pattern1 = !this.pattern2.test(val.code)
       if(!pattern&&!pattern1){
         this.disabled = false
       }
     },
     deep:true
   }
 },
 created (){},
 mounted (){},
 methods: {
  async onSubmit(values) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:0
    })
    try {
      const res = await login(this.user)
      Toast({
        message: '登录成功',
        position: 'bottom',
      })
      this.$store.commit('setUsers',res.data.data)
      this.$router.push(this.$route.query.redirect || 'personal')
      this.$store.commit('removeCachePages','LayoutIndex')
    } catch (error) {
      Toast({
        message: '登录失败:账号或密码错误',
        position: 'bottom',
      })
    }
  },
  async onSendSms(){
    this.loading = true
    try {
      await this.$refs['login_form'].validate('mobile')
      await sendSms(this.user.mobile)
      this.display = false
    } catch (err) {
      this.loading = false
      let message = ''
      if (err && err.response && err.response.status === 429) {
        // 发送短信失败的错误提示
        message = '发送太频繁了，请稍后重试'
      } else if (err.name === 'mobile') {
        // 表单验证失败的错误提示
        message = err.message
      } else {
        // 未知错误
        message = '发送失败，请稍后重试'
      }
      Toast({
        message: message,
        position: 'bottom',
      })
    }
  },
  onfinish(){
    this.display = true
    this.loading = false
  }
 }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    .login_logo{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      img{
        width: 20%;
        height: 35%;
      }
    }
    .login_attention{
      font-size: 13px;
      line-height: 5px;
      text-align: center;
      margin-top: 20px;
      color: rgb(160, 160, 160);
      span{
        color: rgb(240, 126, 126);
      }
      p:last-child{
        margin-top: 20px;
      }
    }
    .login_form{
      .van-form{
        /deep/ .van-field__value{
          padding: 0 20px !important;
        }
      }
    }
  }
</style>
