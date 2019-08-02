export default {
  'POST /api/new/newsBulletinList': (req, res) => {
    res.send({
      code: 200,
      msg: '数据获取成功',
      data,
    });
  },

  'GET /api/new/newsBulletinTop': (req, res) => {
    res.send({
      code: 200,
      msg: '数据获取成功',
      data: {
        gg: 1,
        total: 3,
        xw: 2,
      },
    });
  },

  'GET /api/new/getNewsBulletin': (req, res) => {
    const { id } = req.query;
    let info = {};
    data.list.forEach(obj => {
      if (obj.id.toString() === id.toString()) {
        info = obj;
      }
    });
    res.send({
      code: 200,
      msg: '数据获取成功',
      data: info,
    });
  },
};

const data = {
  pageNum: 1,
  pageSize: 15,
  size: 3,
  startRow: 1,
  endRow: 3,
  total: 3,
  pages: 1,
  list: [
    {
      id: 5,
      type: 0,
      title: '富文本公告',
      titlePicture:
        'https://wx.qlogo.cn/mmopen/vi_32/lrXGy4KxQ0OGLSYs7aYegRicv0Yp8ke5Db4Ve9hs2iciajjuf2SfK0xmeicszWmu83fLP9ibcvQ9SqMGEbwUibUIFicZg/132',
      isRelease: 1,
      readersNumber: 0,
      createBy: 0,
      createDate: '2019-07-12 16:45:01',
      delFlag: 0,
      remarks: '',
      content:
        '<p></p><div class="media-wrap image-wrap"><img class="media-wrap image-wrap" src="http://117.73.8.227:8010/file/getFile?filePath=file/2019-07-12/2019-07-12-16-48-20.png"/></div><p><span style="font-size:40px">撒大声地文字</span></p><p>\uD83D\uDE07</p><h2 style="text-align:center;">山东</h2><p></p><div class="media-wrap image-wrap"><img src="http://117.73.8.92:8010/file/getFile?filePath=file/2019-07-12/2019-07-12-17-05-11.png"/></div><p></p><div class="media-wrap image-wrap"><img class="media-wrap image-wrap" src="http://117.73.8.227:8010/file/getFile?filePath=file/2019-07-12/2019-07-12-16-44-45.png"/></div><p><span style="color:#07a9fe">假按揭啊</span></p><p><span style="text-decoration:line-through">你好</span></p><h1><span style="color:#16a085">A1</span></h1><h2><span style="color:#d35400">A2</span></h2><h4><span style="color:#c0392b">A3</span></h4><h5><span style="color:#8e44ad">A4</span></h5>',
      isReleaseStr: '已发布',
      typeStr: '新闻',
    },
    {
      id: 3,
      type: 1,
      title: '测试公告',
      titlePicture:
        'https://wx.qlogo.cn/mmopen/vi_32/Zb59gRVmDJopNhoD9JCwhZLz5HW14icfriaL9Yib9a1JDD7ASp33o6pUdQAMVtmJuibVEPCXib8FPwTXy6z2FA6m58g/132',
      isRelease: 1,
      readersNumber: 0,
      createBy: 0,
      createDate: '2019-07-06 15:23:04',
      delFlag: 0,
      remarks: '',
      content:
        '<p><span style="font-size:120px">测试公告</span></p><p></p><div class="media-wrap image-wrap"><img src="http://127.0.0.1:8010/file/getFile?filePath=file/2019-07-06/2019-07-06-15-22-44.png" width="1000px" height="1000px" style="width:1000px;height:1000px"/></div><p></p>',
      isReleaseStr: '已发布',
      typeStr: '公告',
    },
    {
      id: 2,
      type: 0,
      title: '测试新闻',
      titlePicture:
        'https://wx.qlogo.cn/mmopen/vi_32/Zb59gRVmDJopNhoD9JCwhZLz5HW14icfriaL9Yib9a1JDD7ASp33o6pUdQAMVtmJuibVEPCXib8FPwTXy6z2FA6m58g/132',
      isRelease: 1,
      readersNumber: 0,
      createBy: 0,
      createDate: '2019-07-06 14:44:09',
      delFlag: 0,
      remarks: '',
      content:
        '<p></p><p>测试新闻</p><p></p><div class="media-wrap image-wrap"><img src="http://117.73.8.227:8010/file/getFile?filePath=file/2019-07-12/2019-07-12-16-47-03.png"/></div><p></p><p>订</p><p>订单</p><p>订单订单</p><p>多发点 </p><p>阿斯达萨达 </p><div class="media-wrap image-wrap align-right" style="text-align:right"><img class="media-wrap image-wrap align-right" src="http://127.0.0.1:8010/file/getFile?filePath=file/2019-07-06/2019-07-06-15-00-28.png"/></div><p></p>',
      isReleaseStr: '已发布',
      typeStr: '新闻',
    },
  ],
  prePage: 0,
  nextPage: 0,
  isFirstPage: true,
  isLastPage: true,
  hasPreviousPage: false,
  hasNextPage: false,
  navigatePages: 8,
  navigatepageNums: [1],
  navigateFirstPage: 1,
  navigateLastPage: 1,
  firstPage: 1,
  lastPage: 1,
};
