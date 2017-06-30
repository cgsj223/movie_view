
import Vue from 'vue'
import register from "./register.vue"
import resource from 'vue-resource'


Vue.use(resource)


let reg=new Vue({
  render:h=>h(register)
}).$mount("#register")
