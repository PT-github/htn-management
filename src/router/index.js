import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/news-center',
                    component: resolve => require(['../components/page/news/news-center.vue'], resolve),
                    meta: { title: '新闻中心' }
                },
                {
                    path: '/news-add',
                    component: resolve => require(['../components/page/news/news-add.vue'], resolve),
                    meta: { title: '新增新闻' }
                },
                {
                    path: '/certificate-management',
                    component: resolve => require(['../components/page/certificate/certificate-management.vue'], resolve),
                    meta: { title: '证书管理' }
                },
                {
                    path: '/teacher-management',
                    component: resolve => require(['../components/page/teacher/teacher-management.vue'], resolve),
                    meta: { title: '教师管理' }
                },
                {
                    path: '/advert-management',
                    component: resolve => require(['../components/page/advert/advert-management.vue'], resolve),
                    meta: { title: '广告管理' }
                },
                {
                    path: '/lesson-cate',
                    component: resolve => require(['../components/page/lesson/lesson-cate.vue'], resolve),
                    meta: { title: '课程分类管理' }
                },
                {
                    path: '/lesson-list',
                    component: resolve => require(['../components/page/lesson/lesson-list.vue'], resolve),
                    meta: { title: '课程列表管理' }
                },
                {
                    path: '/tran-project-list',
                    component: resolve => require(['../components/page/lesson/tran-project-list.vue'], resolve),
                    meta: { title: '培训项目管理' }
                },
                {
                    path: '/video-cate',
                    component: resolve => require(['../components/page/lesson/video-cate.vue'], resolve),
                    meta: { title: '视频分类管理' }
                },
                {
                    path: '/video-list',
                    component: resolve => require(['../components/page/lesson/video-list.vue'], resolve),
                    meta: { title: '视频列表管理' }
                },












                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
