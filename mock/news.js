export default {
  'POST /new/newsBulletinList': (req, res) => {
    const { current } = req.body.pagination;
    const { query } = req.body;
    const newsArr = [];
    list.forEach(obj => {
      let on = true;
      if (query.type && query.type.indexOf(obj.type.toString()) < 0) {
        on = false;
      }
      if (on) {
        newsArr.push(obj);
      }
    });

    const total = newsArr.length;
    const pageNum = current;

    res.send({
      code: 200,
      msg: '数据获取成功',
      data: {
        pageNum,
        total,
        list: newsArr,
      },
    });
  },
  'GET /new/newsBulletinTop': (req, res) => {
    const total = list.length;
    let gg = 0;
    let xw = 0;
    list.forEach(json => {
      if (json.type.toString() === '0') {
        xw += 1;
      } else if (json.type.toString() === '1') {
        gg += 1;
      }
    });
    res.send({
      code: 200,
      msg: '数据获取成功',
      data: {
        gg,
        total,
        xw,
      },
    });
  },
  'GET /new/getNewsBulletin': (req, res) => {
    const { id } = req.query;
    let info = {};
    list.forEach(obj => {
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
  'POST /new/addNewsBulletin': (req, res) => {
    const newsInfo = req.body;
    if (newsInfo.isRelease.toString() === '1') {
      newsInfo.isReleaseStr = '已发布';
    } else {
      newsInfo.isReleaseStr = '未发布';
    }

    if (newsInfo.type.toString() === '0') {
      newsInfo.typeStr = '新闻';
    } else {
      newsInfo.typeStr = '公告';
    }
    newsInfo.id = new Date().getTime();
    newsInfo.readersNumber = 0;
    newsInfo.createDate = '2019-08-03 12:12:12';

    list.push(newsInfo);
    res.send({
      code: 200,
      msg: '添加成功',
      data: null,
    });
  },
  'POST /new/upNewsBulletin': (req, res) => {
    const newsInfo = req.body;
    if (newsInfo.isRelease.toString() === '1') {
      newsInfo.isReleaseStr = '已发布';
    } else {
      newsInfo.isReleaseStr = '未发布';
    }

    if (newsInfo.type.toString() === '0') {
      newsInfo.typeStr = '新闻';
    } else {
      newsInfo.typeStr = '公告';
    }

    list.forEach((json, i) => {
      if (json.id === newsInfo.id) {
        list[i] = { ...json, ...newsInfo };
      }
    });
    res.send({
      code: 200,
      msg: '编辑成功',
      data: null,
    });
  },
  'DELETE /new/delNewsBulletin': (req, res) => {
    const { id } = req.query;
    list.forEach((obj, i) => {
      if (obj.id.toString() === id.toString()) {
        list.splice(i, 1);
      }
    });
    res.send({
      code: 200,
      msg: '删除成功',
      data: null,
    });
  },
};

const list = [
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
];
