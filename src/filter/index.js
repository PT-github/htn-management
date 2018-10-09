import Vue from 'vue'
import { formatDate } from '../utils';
/*
 * 时间戳处理
 * */
Vue.filter('moment', function (timestamp, fm) {
  return formatDate(timestamp, fm);
});