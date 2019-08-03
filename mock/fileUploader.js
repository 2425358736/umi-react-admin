export default {
  'POST /file/fileUploader': (req, res) => {
    res.send({
      code: 200,
      msg: '上传成功',
      data: {
        filePath:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564810548800&di=b0e71d0938a001884985119b6723de01&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffb63c8cc57bf977754b2c891badf0676358fc53e74af-BnyBi9_fw658',
        ossPath:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564810548800&di=b0e71d0938a001884985119b6723de01&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffb63c8cc57bf977754b2c891badf0676358fc53e74af-BnyBi9_fw658',
      },
    });
  },
};
