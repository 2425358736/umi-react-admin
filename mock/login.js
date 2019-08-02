export default {
  'POST /api/login': (req, res) => {
    const { password, userName } = req.body;
    if (password === '123456' && userName === 'admin') {
      res.send({
        code: 200,
        msg: '登录成功',
        data: {
          token: '123456789',
        },
      });
    } else {
      res.send({
        code: 201,
        msg: '登录失败',
        data: null,
      });
    }
  },
};
