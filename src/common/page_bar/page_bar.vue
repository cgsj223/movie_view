<template lang="html">
  <div class="bar_wrapper" @click="handlePage">
    <span class="large_btn"  pageData='first'>首页</span>
    <span class="large_btn"  pageData='lastPage'>上一页</span>
    <span v-for="(num, index) in pages" :class="btnFlag==num ? btn_on :'' " :pageData='num'>{{num}}</span>
    <span class="large_btn"  pageData='nextPage'>下一页</span>
    <span class="large_btn"  pageData='end'>最后</span>
  </div>
</template>

<script>

export default{
  props:{
    count:Number,      //数据库查询总共几条数据
    pageSize:Number,   //每页几条数据
    bar_number:Number, //显示几个按钮
  },
  data :function(){
    return {
      pages:[],   //渲染页码按钮所用数组
      btnFlag:1,  //当前被选中页码
      btn_on:'on',
      initFlag:false
    }
  },

  mounted:function(){
    this.renderPageNum()
  },
  methods:{
    renderPageNum:function(){
      this.pages=[]
      if(this.count<=this.pageSize*this.bar_number){
        let num=Math.ceil(this.count/this.pageSize)
        for(let i=1;i<=num;i++){
          this.pages.push(i)
        }
      }else{
        for(let j=1;j<=this.bar_number;j++){
          this.pages.push(j)
        }
      }
      this.$nextTick()
    },
    handlePage:function(e){
      if(e.target.tagName=='SPAN'){
        let attr=e.target.getAttribute('pageData')
        switch (attr){
          case 'first':
          this.handleBtnFlag('first')
          break
          case 'lastPage':
          this.handleBtnFlag('last')
          break
          case 'nextPage':
          this.handleBtnFlag('next')
          break
          case 'end':
          this.handleBtnFlag('end')
          break
          default:
          if(this.btnFlag==parseInt(attr))return
          this.btnFlag=parseInt(attr)
          this.$emit('pageChange',this.btnFlag)
        }
      }
    },
    handleBtnFlag:function(info){
      let total=Math.ceil(this.count/this.pageSize)
      if(info=='last'){
        if(this.btnFlag==1)return
        this.btnFlag--
        this.$emit('pageChange',this.btnFlag)
        if(this.btnFlag%this.bar_number==0){
          this.pages=[]
          let num1=this.btnFlag-this.bar_number
          for(let i=0;i<this.bar_number;i++){
            num1++
            this.pages.push(num1)
          }
        }
      }else if(info=='next'){
        if(this.btnFlag==Math.ceil(this.count/this.pageSize))return
        this.btnFlag++
        this.$emit('pageChange',this.btnFlag)
        if(this.btnFlag%this.bar_number==1){
          this.pages=[];
          let num=this.btnFlag
          for(let i=0;i<this.bar_number;i++){
            if(num>total)return
            this.pages.push(num)
            num++
          }
        }
      }else if(info=='end'){
        if(this.btnFlag==total)return
        this.btnFlag=total
        this.$emit('pageChange',this.btnFlag)
        let pageNum=this.btnFlag-this.bar_number+1;
        this.pages=[]
        for(let i=0;i<this.bar_number;i++){
          if(pageNum>total||pageNum<1){
            pageNum++
            continue
          }
          this.pages.push(pageNum)
          pageNum++
        }
      }else if(info=='first'){
        if(this.btnFlag==1)return
        this.btnFlag=1
        this.$emit('pageChange',this.btnFlag)
        this.pages=[]
        for(let i=1;i<=this.bar_number;i++){
          if(i>total)return
          this.pages.push(i)
        }
      }
    }

  }


}


</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .bar_wrapper
    height:40px
    line-height: 40px
    margin:20px auto
    span
      border:1px solid rgba(0,0,0,0.2)
      box-shadow: 0 0 1px rgba(0,0,0,0.2)
      border-radius:4px
      display: inline-block
      width:40px
      height: 40px
      text-align: center
      margin-right:8px
      cursor:pointer;
      color:#666
    .large_btn
      width:60px
    .on
      background-color: rgba(1,126,102,0.6);
      color:#fff
      border:none
      box-shadow: 0 0 0

</style>
