/*
 * @Author: zfz
 * @Date: 2021-11-12 14:23:15
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-18 10:57:25
 * @Description: update
 */
import Vue from 'vue'
import App from './App.vue'
import { Input, Checkbox, CheckboxGroup, Icon } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Input)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
