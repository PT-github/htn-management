<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    // {
                    //     icon: 'el-icon-news',
                    //     index: '1',
                    //     title: '新闻中心',
                    //     subs: [
                    //         {
                    //             index: 'news-center',
                    //             title: '新闻列表'
                    //         },
                    //         {
                    //             index: 'news-add',
                    //             title: '新增新闻'
                    //         }
                    //     ]
                    // },
                    {
                        icon: 'el-icon-news',
                        index: 'news-center',
                        title: '新闻中心'
                    },
                    {
                        icon: 'el-icon-sold-out',
                        index: 'certificate-management',
                        title: '证书管理'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'teacher-management',
                        title: '教师管理'
                    },
                    {
                        icon: 'el-icon-picture-outline',
                        index: 'advert-management',
                        title: '首页广告管理'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '1',
                        title: '教育培训',
                        subs: [
                            {
                                index: 'lesson-cate',
                                title: '课程分类管理'
                            },
                            {
                                index: 'lesson-list',
                                title: '课程列表管理'
                            },
                            {
                                index: 'tran-project-list',
                                title: '培训项目管理'
                            },
                            {
                                index: 'video-cate',
                                title: '视频分类管理'
                            },
                            {
                                index: 'video-list',
                                title: '视频列表管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-share',
                        index: 'friend-links',
                        title: '友情链接管理'
                    },
                    {
                        icon: 'el-icon-bell',
                        index: 'signup-list',
                        title: '网上报名管理'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '2',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'onlineUser-list',
                                title: '互联网用户管理'
                            },
                            {
                                index: 'employee-list',
                                title: '员工管理'
                            },
                            {
                                index: 'income-add',
                                title: '新增收益'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'dashboard',
                    //     title: '系统首页'
                    // },
                    // {
                    //     icon: 'el-icon-tickets',
                    //     index: 'table',
                    //     title: '基础表格'
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'tabs',
                    //     title: 'tab选项卡'
                    // },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '表单相关',
                    //     subs: [
                    //         {
                    //             index: 'form',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'editor',
                    //             title: '富文本编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown编辑器'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'charts',
                    //     title: 'schart图表'
                    // },
                    // {
                    //     icon: 'el-icon-rank',
                    //     index: 'drag',
                    //     title: '拖拽列表'
                    // },
                    // {
                    //     icon: 'el-icon-warning',
                    //     index: 'permission',
                    //     title: '权限测试'
                    // },
                    // {
                    //     icon: 'el-icon-error',
                    //     index: '404',
                    //     title: '404页面'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
