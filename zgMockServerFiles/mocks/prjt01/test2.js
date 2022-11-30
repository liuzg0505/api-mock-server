// 测试
module.exports = {
  '/api/getMenuList': {
    $get: (params) => {
      console.log(params);
      return {
        result: 'true',
        errcode: 0,
        message: 'mock getMenuList',
        data: [
          { id: '1', title: '首页', name: 'dashboard', path: '/dashboard' },
          { id: '2', title: '数据管理', name: 'data', path: '', children: [{ id: '2-1', title: '数据概况', name: 'dataOverview', path: '/dataOverview' }] },
          { id: '3', title: '用户列表', name: 'userList', path: '/userList' },
        ],
      };
    },
  },
};
