const menus = [
  {
    id: 'dashboard',
    path: '/dashboard',
    name: '首页',
    pid: '',
    icon: 'el-icon-s-home',
  },
  {
    id: 'content',
    path: '/content',
    name: '内容管理',
    pid: '',
    icon: 'el-icon-folder',
    children: [
      {
        id: 'content_illustration',
        path: '/content/illustration',
        name: '插画管理',
        pid: 'system',
        icon: '',
      },
    ],
  },
  {
    id: 'system',
    path: '/system',
    name: '系统管理',
    pid: '',
    icon: 'el-icon-s-tools',
    children: [
      {
        id: 'system_role',
        path: '/system/role',
        name: '角色管理',
        pid: 'system',
        icon: '',
      },
      {
        id: 'system_user',
        path: '/system/user',
        name: '用户管理',
        pid: 'system',
        icon: '',
      },
      {
        id: 'system_resource',
        path: '/system/permission',
        name: '权限管理',
        pid: 'system',
        icon: '',
      },
    ],
  },
];

module.exports = {
  '/pet2/menu': {
    $get: (params) => {
      console.log(params);
      return {
        head: {
          code: '000000',
          msg: 'mock菜单 成功',
        },
        response: {
          menu: menus,
        },
      };
    },
    $post: (params) => {
      console.log(params);
      return {
        head: {
          code: '000000',
          msg: 'mock菜单 成功',
        },
        response: {
          menu: menus,
        },
      };
    },
  },
};
