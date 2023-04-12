import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  //权限管理
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/authority',
        component: () => import('@/views/authority/index'),
        name: 'authority',
        meta: { title: '权限', icon: 'authority2' }
      }
    ]
  },
  //订单管理
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/order',
        component: () => import('@/views/order/index'),
        name: 'order',
        meta: { title: '订单列表', icon: 'order' }
      }
    ]
  },
  //藏品管理
  {
    path: '/collection',
    component: Layout,

    meta: { title: '藏品管理', icon: 'collection' },
    children: [
      {
        path: '/serieslist',
        component: () => import('@/views/collection/serieslist/index'),
        name: 'serieslist',
        meta: { title: '套系列表', icon: 'serieslist' }
      },
      {
        path: '/createseries',
        component: () => import('@/views/collection/createseries/index'),
        name: 'createseries',
        meta: { title: '创建套系', icon: 'createseries' }
      },
      {
        path: '/deatil',
        hidden: true,
        component: () => import('@/views/collection/detail/index'),
        name: 'deatil',
        meta: { title: '套系详情' }
      },
      {
        path: '/collections',
        hidden: true,
        component: () => import('@/views/collection/collections/index'),
        name: 'collections',
        meta: { title: '藏品列表', icon: 'serieslist' }
      },
      {
        path: '/addcollections',
        hidden: true,
        component: () => import('@/views/collection/addcollections/index'),
        name: 'addcollections',
        meta: { title: '创建藏品', icon: 'createseries' }
      },
      {
        path: '/collectionsDeatil',
        hidden: true,
        component: () => import('@/views/collection/collectionsDeatil/index'),
        name: 'collectionsDeatil',
        meta: { title: '藏品详情' }
      }
    ]
  },

  //app用户列表
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/appuserlist',
        component: () => import('@/views/appuserlist/index'),
        name: 'appuserlist',
        meta: { title: 'app用户列表', icon: 'appuserlist' }
      }
    ]
  },
  //发行方管理
  {
    path: '/issuer',
    component: Layout,
    meta: { title: '发行方管理', icon: 'issuer1' },
    children: [
      {
        path: '/issuer1',
        component: () => import('@/views/issuer/issuer1/index'),
        name: 'issuerList',
        meta: { title: '发行方列表', icon: 'issuer1' }
      },
      {
        path: '/issuer2',
        component: () => import('@/views/issuer/issuer2/index'),
        name: 'createIssuer',
        meta: { title: '创建发行方', icon: 'createseries' }
      },
    ]
  },
  //公告管理
  {
    path: '/announcement',
    component: Layout,
    meta: { title: '公告管理', icon: 'announcement' },
    children: [
      {
        path: 'announcementList',
        component: () => import('@/views/announcement/list/index'),
        name: 'announcementList',
        meta: { title: '公告列表', icon: 'announcement' }
      },
      {
        path: 'announcementAdd',
        component: () => import('@/views/announcement/add/index'),
        name: 'announcementAdd',
        meta: { title: '创建公告', icon: 'createseries' }
      },
      {
        path: 'announcementDetail',
        hidden: true,
        component: () => import('@/views/announcement/detail/index'),
        name: 'announcementDetail',
        meta: { title: '公告详情' }
      }
    ],
  },
  //消息管理
  {
    path: '/message',
    component: Layout,
    meta: { title: '消息管理', icon: 'message' },
    children: [
      {
        path: '/messageList',
        component: () => import('@/views/message/messageList/index'),
        name: 'messageList',
        meta: { title: '消息列表', icon: 'message' }
      },
      {
        path: '/messageCreate',
        component: () => import('@/views/message/messageCreate/index'),
        name: 'messageCreate',
        meta: { title: '创建消息', icon: 'createseries' }
      }, {
        path: '/messageDetail',
        hidden: true,
        component: () => import('@/views/message/detail/index'),
        name: 'messageDetail',
        meta: { title: '消息详情' }
      }
    ]
  },
  //兑换列表
  {
    path: 'exchange',
    component: Layout,
    children: [
      {
        path: '/exchange',
        component: () => import('@/views/exchange/index'),
        name: 'exchange',
        meta: { title: '兑换列表', icon: 'exchange' }
      }
    ]
  },
  //分销商管理
  {
    path: 'distributor',
    component: Layout,
    children: [
      {
        path: '/distributor',
        component: () => import('@/views/distributor/index'),
        name: 'distributor',
        meta: { title: '分销商管理', icon: 'distributor' }
      }
    ]
  },
  //文档管理
  {
    path: 'document',
    component: Layout,
    children: [
      {
        path: '/document',
        component: () => import('@/views/document/index'),
        name: 'document',
        meta: { title: '文档管理', icon: 'document' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
