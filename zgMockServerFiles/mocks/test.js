// 测试
module.exports = {
  '/api/loginTest': {
    $post: (params) => {
      console.log(params);
      return {
        result: 'true',
        errcode: 0,
        message: 'mock 登录',
        data: 'INGRESSCOOKIE=mockCookie;sessionCookie=mockCookie',
      };
    },
  },
  '/api/getName': {
    $get: (params) => {
      console.log(params);
      return {
        result: 'true',
        errcode: 0,
        message: 'mock getName',
        data: {
          id: '111',
          name: 'user01'
        },
      };
    },
  },
};
