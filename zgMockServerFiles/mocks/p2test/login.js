// 登录
// 按钮小权限
const buttons = [];
const error = {
  head: {
    code: '999999',
    msg: 'mock 用户名或密码错误',
  },
  response: {},
};
const success = {
  head: {
    code: '000000',
    msg: 'mock 登录成功',
  },
  response: {
    token: 'INGRESSCOOKIE=mockCookie;sessionCookie=mockCookie',
    userId: "admin01",
    username: "admin01",
    buttons: buttons,
  },
};
module.exports = {
  '/pet2/login': {
    $post: (params) => {
      console.log(params);
      return success;
    },
  },
};
