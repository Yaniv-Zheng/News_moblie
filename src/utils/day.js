import vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

vue.filter('relativeTime',value=>{
  return dayjs(value).from(dayjs())
})

vue.filter('datatime',value=>{
  return dayjs(value).format('MM-DD HH:mm')
})