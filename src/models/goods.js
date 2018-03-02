import request from '../utils/request'

import config from '../config'

export default {
  namespace: 'goods',

  state: {},

  actions: {
    create: (good) => {
      return (dispatch, getState) => {
        return request(`${config.api}/goods`, {
          method: 'post',
          body: JSON.stringify(good)
        })
        .then(good => {
          dispatch({
            type: 'goods/save',
            payload: {
              [good.id]: good
            }
          })
          return good
        })
      }
    },
    retrieve: () => {
      return (dispatch, getState) => {
        return request(`${config.api}/goods`)
        .then(goods => {
          let _goods = {}
          goods.forEach(good => _goods[good.id] = good)

          dispatch({
            type: 'goods/save',
            payload: _goods
          })
          return goods
        })
      }
    },
    update: (good) => {
      return (dispatch, getState) => {
        return request(`${config.api}/goods/${good.id}`, {
          method: 'put',
          body: JSON.stringify(good)
        })
        .then(good => {
          dispatch({
            type: 'goods/save',
            payload: {
              [good.id]: good
            }
          })
          return good
        })
      }
    },
    delete: (id) => {
      return (dispatch, getState) => {
        return request(`${config.api}/goods/${id}`, {
          method: 'delete'
        })
        .then(good => {
          dispatch({
            type: 'goods/remove',
            payload: id
          })
          return good
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
    },
    remove: (state, payload) => {
      delete state[payload]

      return {
        ...state
      }
    }
  }
}