export default {
  namespace: 'screen',

  /**
   * pagination 分页参数
   *
   * query 参数
   *{
   * freezeState: ""
   * }
   *
   *
   * queryShow 查询展示
   * queryTitle 展示的title
   * queryValue 展示的value
   * {
   *  freezeState: {queryTitle: "", queryValue: ""}
   * }
   *
   *
   * orders 排序参数
   */
  state: {
    pagination: {
      current: 1,
      pageSize: 15,
    },
    query: {},
    queryShow: {},
    orders: {
      name: 'a.id',
      type: 'desc',
    },
  },

  effects: {
    *fetch({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *init(_, { put }) {
      const url = location.pathname;
      let payload = localStorage.getItem(url);
      if (payload) {
        payload = JSON.parse(payload);
      }
      yield put({
        type: 'save',
        payload: payload || {
          pagination: {
            current: 1,
            pageSize: 15,
          },
          query: {},
          queryShow: {},
          orders: {
            name: 'a.id',
            type: 'desc',
          },
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
