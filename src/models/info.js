export default {
  namespace: 'info',

  state: {
    open: false,
    id: 0,
  },

  effects: {
    *fetch({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *init(_, { put }) {
      yield put({
        type: 'save',
        payload: {
          open: false,
          id: 0,
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
