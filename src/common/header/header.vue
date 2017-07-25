<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <img src="./logo.png" alt="" width='50px' height="50px">
    </div>
    <h1><a href="/">xx电影网</a></h1>
    <div class="login_reg" v-show='user==0'>
      <span @mouseover="login=true" @mouseout="login=false">
        <a>登录</a>
        <transition name="login_fade">
          <div class="login_wrapper" v-show="login">
            <form class="login" @submit='submitLogin' method="post" action='/login'>
              <input type="text" ref='username' name='username' placeholder="请输入用户名"><br/>
              <input type="password" ref='password' name='password' placeholder="请输入密码">
              <button type="submit">登录</button>
            </form>
          </div>
      </transition>
      </span>|
      <a href="./register">注册</a>
    </div>
    <div class="userLogin" v-show='user!=0'>
      <span>欢迎您！用户：{{user.username}}</span>
      <span><a @click="user=0" href="/logout"> 退出</a></span>
    </div>
  </div>
</template>

<script>
export default {
  mounted:function(){
    this.$http.get('/get_login_state').then(response=>{
      if(response.body.user){
        this.user=response.body.user
        this.$emit('isLogin',this.user)
      }
    }).catch(err=>{
      console.log('failed to connect');
    })
  },
  data:function(){
    return {
      msg:'',
      login:false,
      user:0
    }
  },
  methods:{
    action_data:function(){
      if(!this.msg){return}
      alert(this.msg)
    },
    submitLogin:function(e){ //处理、提交登录数据
      e.preventDefault()
      this.$http.post(e.target.action,{
        username:this.$refs.username.value,
        password:this.$refs.password.value
      }).then(response=>{
        switch (response.body.code){
          case 3000:
          window.location.reload()
          break;
          case 3001:
            alert('用户名或密码错误，请重试')
          break;
          case 3002:
            alert('用户名或密码格式不正确，请重试')
          break;
          case 3003:
            alert('服务忙，请重试')
          break;
        }

      })

    }
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  .header-wrapper
    width:100%
    height:60px
    background-color:#fff
    position:fixed
    padding-left:50px
    border-bottom:2px solid #ffafc9
    z-index:6666
    .logo-wrapper
      width:60px
      height:100%
      display:inline-block
      vertical-align:top
      padding-top:5px
    h1
      font-size:26px
      display:inline-block
      height:60px
      line-height:60px
      vertical-align:top
      color:#00a1d6
      a
        color:@color
    .login_reg
      display:inline-block
      position:absolute
      right:200px
      height:60px
      width:140px
      vertical-align:middle
      color:#00a1d6
      font-size:20px
      .login_fade-enter,.login_fade-leave-active
        opacity: 0
      .login_fade-enter-active,.login_fade-leave-active
        transition:all 0.6s
      a
        cursor: pointer
        display:inline-block
        height:60px
        width:60px
        color:#00a1d6
        text-align:center
        line-height:60px
      a:hover
        background:#f25d8e
        color:#fff
      .login_wrapper
        position: absolute
        border-radius: 0 0 10px 10px
        margin-top:2px
        border:2px solid #ffafc9
        border-top:none
        background-color: #fff
        padding: 20px
        box-sizing: border-box
        width:300px
        height:200px
        left:-50px
        font-size: 18px
        color:black
        .login
          height:130px
          text-align: center
          input
            width:100%
            height:30px
            border:1px solid rgba(0,0,0,0.2)
            font-size: 16px
            color:#666
            border-radius: 6px
            text-indent: 6px
            margin-bottom: 30px
          button
            border:none
            width:100px
            height:40px
            font-size:20px
            border-radius: 10px
            letter-spacing: 6px
            background-color: #67bdcd
            color:#fff
    .userLogin
      display:inline-block
      position:absolute
      right:100px
      height:60px
      line-height:60px
      width:300px
      font-size: 14px
      vertical-align:middle
      color:#00a1d6
      font-size:20px
      &>span:first-child
        display: inline-block
        width:200px
        font-size: 14px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      &>span:last-child
        display: inline-block
        margin-left:20px
        font-size: 14px
        vertical-align: top
        a
          color:@color

</style>
