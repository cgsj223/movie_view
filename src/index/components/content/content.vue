<template >
  <div class="content">
    <div class="left">
      <h3 class="top_title">评分最高</h3>
      <div class="img-wrapper">
        <ul class='img-scroll' ref='img_ul'>
          <li v-for='(item,index) in movie_data' key='index' class='imgs'>
            <a :href="'/movie?id='+item.id">
              <img :src='item.img' width='170px' height='240px' >
              <h4 class="mv-title">{{item.title}}</h4>
            </a>
          </li>
        </ul>
        <ul class="scroll_bar">
          <li v-for="(num,index) in Math.ceil(movie_data.length/4)"
          class="item" :class="{on:img_index+1==num}"
           @click="select_img(index)" @mouseout='startScroll'></li>
        </ul>
      </div>
      <h3>正在热映</h3>
      <div class="movie_wrapper">
        <ul class="movie_list">
          <li v-for='movie in movie_data' class="movie_item">
            <a :href="'/movie?id='+movie.id">
              <img :src='movie.img' alt="" width='130px' height='170px'>
              <h4>{{movie.title}}</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="rank_wrapper">
        <h2>排行榜</h2>
        <ul>
          <li v-for="(data,index) in movie_data" :key='index' v-if="index<10" class="rank_item">
            <a :href="'/movie?id='+data.id">
              <span class="rank_num">{{index+1}}</span><span class="movie_title">{{data.title}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props:{
    movie_data:''
  },
  data:function(){
    return {
      update_flag:0,
      my_img_arr:this.movie_data,
      img_index:0,
      scroll_timer:''
    }
  },
  updated:function(){
      if(this.$data.update_flag==1)return
      this.$data.update_flag=1
      this.scrollInit()
      this.bannerScroll()
  },
  methods:{
    scrollInit:function(){
      let ul=this.$refs.img_ul
      let imgs=ul.getElementsByTagName('li')
      let imgs_ele=[]
      for(let k=0;k<imgs.length;k++){
        imgs_ele.push(imgs[k])
      }
      let last_imgs=imgs.length%4
      if(last_imgs!=0){
        for(let i=0;i<4-last_imgs;i++){
          let node=document.createElement('li')
          node.setAttribute('class','imgs')
          ul.insertBefore(node,ul.childNodes[0])
        }
      }
      for(let j=0;j<last_imgs;j++){
        let copyEle=imgs_ele[imgs_ele.length-1-j].cloneNode(true)
        ul.insertBefore(copyEle,ul.childNodes[0])
      }
      if(last_imgs===0){
        for(let k=0;k<4;k++){
          let ele=imgs_ele[imgs_ele.length-1-k].cloneNode(true)
          ul.insertBefore(ele,ul.childNodes[0])
        }
      }
      ul.style.left='-728px'
    },
    bannerScroll:function(){
      let ul=this.$refs.img_ul
      let imgs=ul.getElementsByTagName('li')
      let pages=Math.ceil((imgs.length-4)/4)
      let timer=window.setInterval(()=>{
        for (let n=0;n<80;n++){
          let time_out=setTimeout(function(){
            ul.style.left=parseFloat((parseFloat(ul.style.left.slice(0,-2))-9.1).toFixed(2))+'px'
              window.clearTimeout(time_out)
          },20*n)
        }
        this.$data.img_index++
        if(this.$data.img_index>pages-1){
          this.$data.img_index=0
          ul.style.left='0px'
        }
      },5000)
      this.scroll_timer=timer
    },
    select_img:function(index){
      let ul=this.$refs.img_ul
      clearInterval(this.scroll_timer)
      this.scroll_timer=undefined
      let scroll_width=(index-this.img_index)*728
      let step=scroll_width>0 ? 9.1 : -9.1
      for(let i=0;i<Math.abs(scroll_width/9.1);i++){
        let timer2=window.setTimeout(function(){
            ul.style.left=parseFloat((parseFloat(ul.style.left.slice(0,-2))-step).toFixed(2))+'px'
            window.clearTimeout(timer2)
        },8*i)
      }
      this.img_index=index
    },
    startScroll:function(){
      if(this.scroll_timer)return
      this.bannerScroll()
    }
  },
  components:{
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  .content
    display:flex
    margin:20px auto
    justify-content:space-between
    width:1000px
    .left
      width:740px
      height:100%
      h3
        height:50px
        line-height: 50px
        font-size: 20px
        color:#222
        border-bottom:1px solid #f10214
      .top_title
        margin-bottom:20px
      .img-wrapper
        height:300px
        overflow:hidden
        position:relative
        .img-scroll
          position:absolute
          white-space:nowrap
          .imgs
            display: inline-block;
            margin-left:12px
            width:170px
            .mv-title
              font-size:16px
              height:30px
              line-height:30px
              text-align:center
        .scroll_bar
          position: absolute
          bottom:0
          left:50%
          margin-left: -250px
          width:500px
          text-align:center
          .item
            display: inline-block;
            border-radius: 50%
            width:12px
            height:12px
            margin-right:8px
            background-color:#999
            cursor:pointer
          .on
            background-color:#f10214
      .movie_wrapper
        margin-top: 20px
        .movie_item
          height:200px
          margin-bottom: 20px
          border-bottom: 1px solid rgba(0,0,0,0.1)
          box-shadow: 0 1px 1px rgba(0,0,0,0.1)
          display: inline-block;
          width:185px
          text-align: center;
    .right
      width:240px
      margin-top:20px
      border:1px solid #edf2f9
      box-shadow: 0 1px 2px rgba(0,0,0,0.2)
      border-radius: 4px
      .rank_wrapper
        padding:20px
        h2
          padding-bottom: 10px
          height:40px
          line-height: 40px
          font-size: 24px
          font-weight: normal
          color:#81c2d6
          border-bottom: 1px dashed #ff7073
        ul
          .rank_item
            height: 60px
            line-height: 60px
            font-size: 20px
            letter-spacing: 2px
            border-bottom:1px dashed rgba(0,0,0,0.2)
            a
              display: block
              width:100%
            &:last-child
              border-bottom:none
            .rank_num
              font-size:26px
              color:#f5b977
              margin-right: 10px
            .movie_title
              display:inline-block
              vertical-align:top
              height:60px
              line-height:60px
</style>
