export default {
  namespace: 'breadcrumb',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
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
