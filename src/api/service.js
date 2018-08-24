import request from '../utils/request'
export function queryNews(data) {
  return request({
    url: '/queryNews',
    method: 'post',
    data
  })
}
export function queryCertificate(data) {
  return request({
    url: '/queryCertificate',
    method: 'post',
    data
  })
}
export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}
export function publishNews(id) {
  return request({
    url: '/publishNews',
    method: 'post',
    params: {
      id
    }
  })
}
export function recallNews(id) {
  return request({
    url: '/recallNews',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteNews(id) {
  return request({
    url: '/deleteNews',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteCert(id) {
  return request({
    url: '/deleteCert',
    method: 'post',
    params: {
      id
    }
  })
}
export function addNews(data) {
  return request({
    url: '/addNews',
    method: 'post',
    data
  })
}
export function modifyCert(data) {
  return request({
    url: '/modifyCert',
    method: 'post',
    data
  })
}
export function queryNewsDetail(id) {
  return request({
    url: '/queryNewsDetail',
    method: 'post',
    params: {id}
  })
}