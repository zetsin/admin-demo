export default {
  namespace: 'app',

  state: {
    message: ''
  },

  actions: {
    notify: (message = '') => {
      return (dispatch, getState) => {
        dispatch({
          type: 'app/save',
          payload: {
            message
          }
        })
      }
    }
  },

  reducers: {
    save: (state, payload) => {
      return {
        ...state,
        ...payload
      }
    }
  }
}