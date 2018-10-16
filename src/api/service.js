import request from '../utils/request'
export function queryLessonCate(data) {
  return request({
    url: '/queryLessonCate',
    method: 'post',
    data
  })
}
export function queryVideoList(data) {
  return request({
    url: '/queryVideoList',
    method: 'post',
    data
  })
}
export function queryVideoCate(data) {
  return request({
    url: '/queryVideoCate',
    method: 'post',
    data
  })
}
export function queryProject(data) {
  return request({
    url: '/queryProject',
    method: 'post',
    data
  })
}
export function queryLessonList(data) {
  return request({
    url: '/queryLessonList',
    method: 'post',
    data
  })
}
export function deleteAdvert(id) {
  return request({
    url: '/deleteAdvert',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteLessonList(id) {
  return request({
    url: '/deleteLessonList',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteLessonCate(id) {
  return request({
    url: '/deleteLessonCate',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteProject(id) {
  return request({
    url: '/deleteProject',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteVideo(id) {
  return request({
    url: '/deleteVideo',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteVideoCate(id) {
  return request({
    url: '/deleteVideoCate',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteFriendLinks(id) {
  return request({
    url: '/deleteFriendLinks',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteSignupList(id) {
  return request({
    url: '/deleteSignupList',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteOnlineUser(id) {
  return request({
    url: '/deleteOnlineUser',
    method: 'post',
    params: {
      id
    }
  })
}
export function deleteEmployeeUser(id) {
  return request({
    url: '/deleteEmployeeUser',
    method: 'post',
    params: {
      id
    }
  })
}
export function resetPwdOnlineUser(id) {
  return request({
    url: '/resetPwdOnlineUser',
    method: 'post',
    params: {
      id
    }
  })
}
export function modifyAdvert(data) {
  return request({
    url: '/modifyAdvert',
    method: 'post',
    data
  })
}
export function addIncome(data) {
  return request({
    url: '/addIncome',
    method: 'post',
    data
  })
}
export function modifyVideo(data) {
  return request({
    url: '/modifyVideo',
    method: 'post',
    data
  })
}
export function modifyVideoCate(data) {
  return request({
    url: '/modifyVideoCate',
    method: 'post',
    data
  })
}
export function modifySignupList(data) {
  return request({
    url: '/modifySignupList',
    method: 'post',
    data
  })
}
export function modifyProject(data) {
  return request({
    url: '/modifyProject',
    method: 'post',
    data
  })
}
export function modifyLessons(data) {
  return request({
    url: '/modifyLessons',
    method: 'post',
    data
  })
}
export function modifyLessonCate(data) {
  return request({
    url: '/modifyLessonCate',
    method: 'post',
    data
  })
}
export function modifyFriendLinks(data) {
  return request({
    url: '/modifyFriendLinks',
    method: 'post',
    data
  })
}
export function modifyOnlineUser(data) {
  return request({
    url: '/modifyOnlineUser',
    method: 'post',
    data
  })
}
export function modifyEmployeeUser(data) {
  return request({
    url: '/modifyEmployeeUser',
    method: 'post',
    data
  })
}
export function setAdvertIsDisplay(data) {
  return request({
    url: '/setAdvertIsDisplay',
    method: 'post',
    data
  })
}
export function queryAdvert(data) {
  return request({
    url: '/queryAdvert',
    method: 'post',
    data
  })
}
export function queryEmployeeUser(data) {
  return request({
    url: '/queryEmployeeUser',
    method: 'post',
    data
  })
}
export function queryOnlineUser(data) {
  return request({
    url: '/queryOnlineUser',
    method: 'post',
    data
  })
}
export function querySignupList(data) {
  return request({
    url: '/querySignupList',
    method: 'post',
    data
  })
}
export function queryFriendsLinks(data) {
  return request({
    url: '/queryFriendsLinks',
    method: 'post',
    data
  })
}
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
export function deleteTeacher(id) {
  return request({
    url: '/deleteTeacher',
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
export function modifyTeacher(data) {
  return request({
    url: '/modifyTeacher',
    method: 'post',
    data
  })
}
export function queryTeacher(data) {
  return request({
    url: '/queryTeacher',
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