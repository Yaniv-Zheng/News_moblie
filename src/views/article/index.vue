<template>
  <div class="page">
    <van-nav-bar
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon name="share-o" size="20" />
      </template>
    </van-nav-bar>
    <div class="article_all">
      <p>{{articleDate.title}}</p>
      <div class="author_data">
        <div class="author_data_img">
          <van-image
            round
            width="1.1rem"
            height="1.1rem"
            :src="articleDate.aut_photo"
          />
          <div class="author_name">
            <div>{{articleDate.aut_name}}</div>
            <div>{{ articleDate.pubdate | relativeTime }}</div>
          </div>
        </div>
        <div class="author_data_follow" @click="articleDate.is_followed=!articleDate.is_followed">
          <van-button icon="plus" color="rgb(243, 62, 62)" size="small" round v-if="!articleDate.is_followed">关注</van-button>
          <van-button icon="plus"  size="small" round v-else>已关注</van-button>
        </div>
      </div>
      <div v-html="articleDate.content" class="article_text markdown-body" ref="content_body"></div>
    </div>
    <div class="article_btm">
      <van-button type="default" @click="textareaShow=true">评论</van-button>
      <van-icon class="commentBtn" name="chat-o" />
      <van-icon :color="articleDate.is_collected?'red':''" :name="articleDate.is_collected?'label':'label-o'" @click="articleDate.is_collected=!articleDate.is_collected"/>
      <van-icon :color="follow?'red':''" :name="follow?'good-job':'good-job-o'" @click="follow=!follow"/>
    </div>
    <comment-index :articleId="articleId" :newText="newText"/>

    <van-popup v-model="textareaShow" position="bottom" :style="{ height: '20%' }" >
      <van-row class="textBox">
        <van-col span="20">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </van-col>
        <van-col span="4">
          <van-button type="default" @click="sendComment">发表</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { setComments } from '@/api/comment'
import CommentIndex from './component/comment'
import { ImagePreview } from 'vant'
import './markdown.css'
import { getArticleText } from '@/api/article'
import { Toast } from 'vant'
export default {
 name: 'ArticleText',
 components: {
   CommentIndex
 },
 props: {
   articleId:{
     type:[String,Number,Object],
     required:true
   }
 },
 data() {
   return {
     articleDate:{},
     follow:false,
     message:'',
     textareaShow:false,
     newText:{}
   }
 },
 computed: {},
 watch: {},
 created (){
   this.loadGetArticleText()
 },
 mounted (){},
 methods: {
   async loadGetArticleText(){
     const { data } = await getArticleText(this.articleId)
     this.articleDate = data.data
     this.$nextTick(()=>{
        this.loadBigImg()
     })
   },
   loadBigImg(){
      const content_body = this.$refs['content_body']
      const img = [...content_body.querySelectorAll('img')]
      const imgs = []
      img.forEach((item,index)=>{
        imgs.push(item.currentSrc)
        item.onclick = function(){
          ImagePreview({
            images: imgs,
            startPosition: index,
          })
        }
      })
   },
   async sendComment(){
     const { data } = await setComments({
       target:this.articleId.toString(),
       content:this.message,
       art_id:this.articleId===null?null:this.articleId.toString()
     })
     console.log(data)
     if(data){
       Toast('评论成功')
       this.textareaShow = false
       this.newText = data.data.new_obj
       console.log('1'-1)
     }else{
       Toast('评论失败')
       this.textareaShow = false
     }
   }
 }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100vw;
    word-break: break-all;
    word-wrap:break-word;
    .van-nav-bar{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .article_all{
      margin-top: 51px;
      p{
        font-size: 20px;
        padding: 0 17px;
      }
    }
    .author_data{
      padding: 0 17px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .author_data_img{
        height: 100%;
        font-size: 17px;
        display: flex;
        align-items: center;
        .author_name{
          margin-top: 3px;
          margin-left: 10px;
          div:last-child{
            font-size: 14px;
            color: rgb(97, 97, 97);
          }
        }
      }
    }
    .article_text{
      margin-top: 30px;
      padding: 0 17px;
      word-break:break-all;
      /deep/img{
        width: 100%;
        height: auto;
      }
    }
    .article_btm{
      width: 100%;
      height: 40px;
      position: fixed;
      z-index: 9;
      display: flex;
      justify-content: space-around;
      align-items: center;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      .van-button{
        width: 150px;
        height: 30px;
        border-radius: 40px;
        color: rgb(83, 83, 83);
        border: 1px solid rgb(190, 190, 190);
      }
      .van-icon{
        font-size: 24px;
      }
    }
    .textBox{
      background-color:#fff;
      position:fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
    }
  }
</style>