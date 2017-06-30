import Vue from 'vue'
import movie from "./movie.vue"
import resource from 'vue-resource'


Vue.use(resource)

let reg=new Vue({
  render:h=>h(movie)
}).$mount("#movie")
