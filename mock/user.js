// 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req, res) => {
    if (interceptor(req)) {
      res.send({
        code: 200,
        msg: '数据获取成功',
        data: {
          userName: 'admin',
          portrait: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          id: '1',
          email: '2425358736@qq.com',
          signature: '做自己',
          address: '山东省青岛市黄岛区万科新都会',
          phone: '185555555',
        },
      });
    } else {
      res.send({
        code: 401,
        msg: 'token不存在',
        data: null,
      });
    }
  },
};

function interceptor(req) {
  const { authorization } = req.headers;
  if (authorization) {
    return true;
  }
  return false;
}
