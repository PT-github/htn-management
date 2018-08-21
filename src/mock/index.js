import Mock from 'mockjs'
import api from './home'
Mock.setup({
  timeout: '500'
})
Mock.mock(/\/upload/, 'post', api.upload)
Mock.mock(/\/queryNews$/, 'post', api.queryNews)
Mock.mock(/\/publishNews/, 'post', api.queryNews)
Mock.mock(/\/recallNews/, 'post', api.queryNews)
Mock.mock(/\/deleteNews/, 'post', api.queryNews)
Mock.mock(/\/addNews/, 'post', api.queryNews)
Mock.mock(/\/queryNewsDetail/, 'post', api.queryNewsDetail)