<template>
  <div>
    <myHeader></myHeader>
    <div class="content_wrapper">
      <div class="form">
        <div class="reg_item">
          <span>用户名</span>
          <input type="text" name="username" placeholder="请输入用户名" @focus="inputFocus" @blur="action">
          <p v-show="showInfo=='username'">用户名由4-16位字母、数字、下划线或者汉字组合</p>
          <p v-show="testFlag==1"  style="color:green">用户名可用</p>
          <p v-show="testFlag=='usernameError'" style="color:red">用户名格式不正确</p>
        </div>
        <div class="reg_item">
          <span>密码</span>
          <input type="password" name="password" placeholder="请输入密码" @focus="inputFocus" @blur="action">
          <p v-show="showInfo=='password'">密码由6-16位字母、数字组合</p>
          <p v-show="testFlag==2"  style="color:green">密码可用</p>
          <p v-show="testFlag=='passwordError'" style="color:red">密码格式不正确</p>
        </div>
        <div class="reg_item">
          <span>手机</span>
          <input type="text" name="phone" placeholder="请输入手机号"  @focus="inputFocus" @blur="action">
          <p v-show="testFlag==3"  style="color:green">手机号码可用</p>
          <p v-show="testFlag=='phoneError'" style="color:red">手机号码格式不正确</p>
        </div>
        <div class="reg_item">
          <span>邮箱</span>
          <input type="text" name="email" placeholder="请输入邮箱" @focus="inputFocus" @blur="action">
          <p v-show="testFlag==4"  style="color:green">邮箱可用</p>
          <p v-show="testFlag=='emailError'" style="color:red">邮箱格式不正确</p>
        </div>
        <button type="button" name="submit" class="submit" @click.stop="submitData">注册</button>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from  "../common/header/header.vue"
import myFooter from "../common/footer/footer.vue"

export default {
  name:'register',
  data:function(){
    return {
      showInfo:false,
      testFlag:false,
      correctItem:[],
      text:'',
      postData:{}
    }
  },
  methods:{
    inputFocus:function(event){
      if(event.target.value==''){
        this.showInfo=event.target.name
        this.testFlag=false
      }
      event.target.className+='active'
    },
    action:function(event){
      event.target.className=''
      this.showInfo=false
      let value=event.target.value
      switch (event.target.name){
        case 'username':
          if(/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,16}$/.test(value)){
            this.$http.post('/check_username',{user:value})
            .then(response=>{
              if(response.body.code===1000){
                this.testFlag=1
                this.correctItem[0]=1
                this.postData.username=value
              }else{
                alert('用户名已存在')
              }
            })
            .catch(err=>{
              console.log(err);
            })
          }else{
            this.testFlag='usernameError'
            this.correctItem[0]=0
          }
          break
        case 'password':
          if(/^[a-zA-Z0-9]{6,20}$/.test(value)){
            this.testFlag=2
            this.correctItem[1]=1
            this.postData.password=value
          }else{
            this.testFlag='passwordError'
            this.correctItem[1]=0
          }
          break
        case 'phone':
          if(/^1[0-9]{10}$/.test(value)){
            this.testFlag=3
            this.correctItem[2]=1
            this.postData.phone=value
          }else{
            this.testFlag='phoneError'
            this.correctItem[2]=0
          }
          break
        case 'email':
          if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){1,3}$/.test(value)){
            this.testFlag=4
            this.correctItem[3]=1
            this.postData.email=value
          }else{
            this.testFlag='emailError'
            this.correctItem[3]=0
          }
          break
      }
    },
    submitData:function(){
      let sum=0
      this.correctItem.forEach(function(item,index){
        sum+=item
      })
      if(sum===4){
        let _this=this
        _this.$http.post('/register',_this.postData)
        .then(response=>{
          if(response.body.code==2000){
            alert('注册成功')
            this.submitData=null
            window.location.pathname='/'
          }else{
            alert('注册失败')
          }
        })
      }
    }
  },
  components:{
    myHeader,
    myFooter
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  .content_wrapper
    width:100%
    height:600px
    padding-top: 60px
    background: #e4ecf3
    .form
      width:600px
      background: #fff
      margin:0 auto
      margin-top:40px
      border:1px solid rgba(0,0,0,0.2)
      box-shadow: 0 0 3px rgba(0,0,0,0.2)
      border-radius:8px
      .reg_item
        width:100%
        height:100px
        line-height: 100px
        position: relative
        span
          position: absolute
          font-size: 18px
          color:#00a1d6
          left:140px
        input
          border:2px solid rgba(0,0,0,0.3)
          text-indent:4px
          height:30px
          line-height: 30px
          border-radius: 6px
          top:50%
          margin-top:-15px
          position: absolute
          left:200px
        .active
          border:1px solid #e96900
        p
          position: absolute
          top:70px
          height:16px
          line-height: 16px
          font-size: 14px
          text-indent: 200px
          color:#999
      .submit
        display: block
        color:#fff
        border-radius:8px
        border:none
        width:120px
        height:50px
        background: #67bdcd
        line-height: 40px
        margin:20px auto 40px auto
        font-size: 26px
        letter-spacing: 6px
        cursor:pointer
</style>
