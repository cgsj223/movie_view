<template>
  <div id="app">
    <mvHeader></mvHeader>
    <div class="content-wrapper">
      <mvContent :movie_data='movie_data' ></mvContent>
    </div>
    <mvFooter></mvFooter>
  </div>
</template>

<script>
import header from '../common/header/header.vue'
import content from './components/content/content.vue'
import footer from '../common/footer/footer.vue'


export default {
  name: 'app',
  data:function(){
    return {
      movie_data:[],
    }
  },
  beforeCreate:function(){
    this.$http.get('/index_data',{
      params:{
        count:20
      }
    })
    .then((response)=>{
      this.$data.movie_data=response.body
    })
    .catch(response=>{
      console.log(response.body)
    })
  },
  components:{
    "mvHeader":header,
    'mvContent':content,
    'mvFooter':footer
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content-wrapper
    padding-top:70px

</style>
