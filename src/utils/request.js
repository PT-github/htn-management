import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
	// baseURL: process.env.BASE_API, // api的base_url
	timeout: 5000 // request timeout
})
// respone interceptor
service.interceptors.response.use(
	response => {
		const res = response.data;
		/**
		 * 通过response自定义success来标示请求状态
		 */
		if (res && res.success) {
			return response.data;
		} else {
        Message({
          message: '错误：' + res.message,
          type: 'error'
        })
			return Promise.reject('error');
		}
	},
	error => {
    console.log(error)
		Message({
      message: '错误：' + res.message,
      type: 'error'
    })
		return Promise.reject(error)
	})

export default service
