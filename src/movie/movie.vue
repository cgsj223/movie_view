<template lang="html">
  <div>
    <myHeader @isLogin='loginState'></myHeader>
    <div class="movie_wrapper">
      <div class="info_wrapper">
          <img :src="movieData.img" width="300px" height="400px" alt="">
          <ul>
            <li><span>片名：</span>{{movieData.title}}</li>
            <li><span>导演：</span>{{movieData.director}}</li>
            <li><span>主演：</span>{{movieData.actors}}</li>
            <li><span>年份：</span>{{movieData.year}}</li>
            <li><span>评分：</span>{{movieData.rating}}</li>
          </ul>
      </div>
      <div class="comment_wrapper">
        <h3>评论</h3>
        <ul>
          <li v-for="item in comments" class="comment_item">
            <span class="user">{{item.username}}:</span>
            <p class="comment">{{item.content}}</p>
            <span class="date">{{item.time}}</span>
          </li>
        </ul>
        <div class="no_comment" v-show="count==0">
          暂无评论
        </div>
      </div>
      <pagesBar v-if="count" :count="count" :pageSize="pageSize" :bar_number="bar_number" @pageChange="getComments"></pagesBar>
      <div class="input_wrapper">
        <form class="input" @submit='sendData' action="/comment" method="post">
          <textarea name="content" v-model='inputComment' class="content" :disabled="locked" spellcheck="false"></textarea>
          <input type="submit" value='提交' class="submit_btn">
        </form>
        <div class="lockedInfo" v-show='locked'>
          登录后评论
        </div>
        <span class="word_limit">最多200字</span>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from "../common/header/header.vue"
import myFooter from "../common/footer/footer.vue"
import pagesBar from "../common/page_bar/page_bar.vue"

export default {
  data:function(){
    return {
      movieData:'',
      comments:[],
      inputComment:'',
      user:'',
      locked:true,
      pageSize:5,
      count:false,
      bar_number:5
    }
  },
  mounted:function(){
    let mid=parseInt(/[0-9]+$/.exec(window.location.href))
    //获取电影信息
    this.$http.get('/movie_data',{
      params:{
        mid:mid
      }
    })
    .then(response=>{
      this.movieData=response.body
      document.title=response.body.title
    })
    .catch(err=>{
      console.log('failed to connect');
    });


    //评论初始化
    this.$http.get('/comment',{
      params:{
        mid:mid,
        page:1,
        pageSize:this.pageSize,
        count:true
      }
    })
    .then(response=>{
      this.comments=response.body.comments
      this.count=response.body.count
    })
    .catch(err=>{
      console.log(err);
    })

  },
  methods:{
    sendData:function(e){
      e.preventDefault()
      let content=this.inputComment.trim()
      let time=new Date()
      let uid=this.user.id
      let mid=parseInt(/[0-9]+$/.exec(window.location.href))
      if(content.length>200){
        alert("字数超过了"+(content.length-200)+"字")
        return
      }
      if(content){
        this.$http.post('/comment',{
            content,
            time:time.toLocaleString(),
            uid,
            mid
        }).then(response=>{
          if(response.body.code==5000){
            alert("评论成功")
            this.comments.pop()
            this.comments.unshift({
              content,
              time:time.toLocaleString(),
              username:this.user.username
            });
            if(this.count==0){
              this.count=1
            }
          }else{
            alert("服务器忙，请重试")
          }
        })
      }
    },
    loginState:function(user){
      if(user){
        this.locked=false
        this.user=user
      }
    },
    getComments:function(page){
      let mid=parseInt(/[0-9]+$/.exec(window.location.href))
      this.$http.get('comment',{
        params:{
          mid:mid,
          page:page,
          pageSize:this.pageSize
        }
      }).then(response=>{
        this.comments=response.body.comments
      }).catch(err=>{
        throw Error(err)
      })
    }
  },
  components:{
    myHeader,
    myFooter,
    pagesBar
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .movie_wrapper
    width:800px
    margin:0 auto
    padding-top:100px
    margin-bottom: 20px
    .info_wrapper
      ul
        display: inline-block
        height:400px
        vertical-align: top
        margin-left:40px
        li
          height:50px
          line-height: 50px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden;
          color:#37a
          font-size: 18px
          span
            color:#999
            font-size:20px
    .comment_wrapper
      border:1px solid rgba(0,0,0,0.2)
      box-shadow:0 0 2px rgba(0,0,0,0.2)
      padding:20px 20px
      margin-top:20px
      h3
        font-size:24px
        margin-bottom: 15px
        color:#017e66
        font-weight: bold
      .comment_item
        border-top: 1px solid #e5e9ef
        position:relative
        padding:20px 0
        color:#333
        font-size:18px
        .user
          color:#017e66
          margin-right:8px
          font-weight: bold
          vertical-align: top
          display: inline-block
        .date
          position: absolute
          right:0
          font-size: 13px
          color:#666
        .comment
          display: inline-block;
          word-wrap: break-word;
          word-break:break-all;
          width:500px
      .no_comment
        text-align: center;
        font-size: 16px
        color: rgba(0,0,0,0.6)
    .input_wrapper
      margin-top:20px
      border:1px solid rgba(0,0,0,0.2)
      box-shadow:0 0 2px rgba(0,0,0,0.2)
      position: relative
      .input
        width:100%
        .content
          display: block;
          margin:20px auto;
          resize: none
          border:2px solid rgba(1,126,102,0.6)
          width:750px
          font-size: 16px
          height:200px
          overflow:auto
          word-break: break-all
        .submit_btn
          display: block;
          border-radius: 4px
          cursor: pointer
          width:100px
          height: 40px
          background-color: rgba(1,126,102,0.6)
          color:#fff
          margin:20px auto
      .lockedInfo
        width:120px
        height: 50px
        line-height: 50px
        background-color: rgba(1,126,102,0.6)
        color:#fff
        font-size: 20px
        text-align: center
        border-radius: 4px
        position: absolute
        left:50%
        margin-left:-60px
        top:95px
      .word_limit
        font-size:18px
        color:rgba(0,0,0,0.6)
        position: absolute;
        bottom: 60px
        right:20px
</style>
