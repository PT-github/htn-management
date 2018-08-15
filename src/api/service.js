import request from '../utils/request'
export function queryNews(data) {
  return request({
    url: '/queryNews',
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