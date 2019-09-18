import request from '../utils/request'
export function queryLessonCate(data) {
  return request({
    url: '/admin/lesson/queryLessonCate',
    method: 'post',
    data
  })
}
export function queryVideoList(data) {
  return request({
    url: '/admin/video/queryVideoList',
    method: 'post',
    data
  })
}
export function queryVideoCate(data) {
  return request({
    url: '/admin/video/queryVideoCate',
    method: 'post',
    data
  })
}
export function queryProject(data) {
  return request({
    url: '/admin/train/queryProject',
    method: 'post',
    data
  })
}
export function queryLessonList(data) {
  return request({
    url: '/admin/lesson/queryLessonList',
    method: 'post',
    data
  })
}
export function deleteAdvert(id) {
  return request({
    url: '/admin/advert/deleteAdvert',
    method: 'post',
    data: {
      id:id
    }
  })
}
export function deleteLessonList(id) {
  return request({
    url: '/admin/lesson/deleteLessonList',
    method: 'post',
    data: {
      id: id
    }
  })
}
export function deleteLessonCate(id) {
  return request({
    url: '/admin/lesson/deleteLessonCate',
    method: 'post',
    data: {
      id: id
    }
  })
}
export function deleteProject(id) {
  return request({
    url: '/admin/train/deleteProject',
    method: 'post',
    data: {
      id: id
    }
  })
}
export function deleteVideo(id) {
  return request({
    url: '/admin/video/deleteVideo',
    method: 'post',
    data: {
      id:id
    }
  })
}

export function deleteVideoCate(id) {
  return request({
    url: '/admin/video/deleteVideoCate',
    method: 'post',
    data: {
      id:id
    }
  })
}
export function deleteFriendLinks(id) {
  return request({
    url: '/admin/friendlink/deleteFriendLinks',
    method: 'post',
    data: {
      id:id
    }
  })
}
export function deleteSignupList(id) {
  return request({
    url: '/admin/signup/deleteSignupList',
    method: 'post',
    data: {
      id:id
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
    url: '/admin/advert/modifyAdvert',
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
    url: '/admin/video/modifyVideo',
    method: 'post',
    data
  })
}
export function modifyVideoCate(data) {
  return request({
    url: '/admin/video/modifyVideoCate',
    method: 'post',
    data
  })
}
export function modifySignupList(data) {
  return request({
    url: '/admin/signup/modifySignupList',
    method: 'post',
    data
  })
}
export function modifyProject(data) {
  return request({
    url: '/admin/train/modifyProject',
    method: 'post',
    data
  })
}
export function modifyLessons(data) {
  return request({
    url: '/admin/lesson/modifyLessons',
    method: 'post',
    data
  })
}
export function modifyLessonCate(data) {
  return request({
    url: '/admin/lesson/modifyLessonCate',
    method: 'post',
    data
  })
}
export function modifyFriendLinks(data) {
  return request({
    url: '/admin/friendlink/modifyFriendLinks',
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
    url: '/admin/advert/setAdvertIsDisplay',
    method: 'post',
    data
  })
}
export function queryAdvert(data) {
    return request({
        url: '/admin/advert/queryAdvert',
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
    url: '/admin/user/queryOnlineUser',
    method: 'post',
    data
  })
}
export function querySignupList(data) {
  return request({
    url: '/admin/signup/querySignupList',
    method: 'post',
    data
  })
}
export function queryFriendsLinks(data) {
  return request({
    url: '/admin/friendlink/queryFriendsLinks',
    method: 'post',
    data
  })
}
export function queryNews(data) {
  return request({
    url: '/admin/news/queryNews',
    method: 'post',
    data
  })
}
export function queryCertificate(data) {
  return request({
    url: '/admin/cert/queryCertificate',
    method: 'post',
    data
  })
}
export function upload(data) {
  return request({
    url: '/admin/upload',
    method: 'post',
    data
  })
}
export function publishNews(id) {
  return request({
    url: '/admin/news/publishNews',
    method: 'post',
    data: {
      id:id
    }
  })
}
export function recallNews(id) {
  return request({
    url: '/admin/news/recallNews',
    method: 'post',
    data: {
      id:id
    }
  })
}
export function deleteNews(id) {
  return request({
    url: '/admin/news/deleteNews',
    method: 'post',
    data: {
      id:id
    }
  })
}
export function deleteCert(id) {
  return request({
    url: '/admin/cert/deleteCert',
    method: 'post',
    data: {
      id: id
    }
  })
}
export function deleteTeacher(id) {
  return request({
    url: '/admin/teacher/deleteTeacher',
    method: 'post',
      data: {
      id:id
    }
  })
}
export function addNews(data) {
  return request({
    url: '/admin/news/addNews',
    method: 'post',
    data
  })
}
export function modifyCert(data) {
  return request({
    url: '/admin/cert/modifyCert',
    method: 'post',
    data
  })
}
export function modifyTeacher(data) {
  return request({
    url: '/admin/teacher/modifyTeacher',
    method: 'post',
    data
  })
}
export function queryTeacher(data) {
  return request({
    url: '/admin/teacher/queryTeacher',
    method: 'post',
    data
  })
}
export function queryNewsDetail(id) {
  return request({
    url: '/admin/news/queryNewsDetail',
    method: 'post',
    data: {id: id}
  })
}
