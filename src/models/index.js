import app from './app'
import goods from './goods'

export const App = app.actions
export const Goods = goods.actions

export default {
  app: genReducer(app),
  goods: genReducer(goods),
}

function genReducer(model) {
  return function(state = model.state, action) {
    const namespace = `${model.namespace}/`
    const index = action.type.indexOf(namespace)
    if(!index) {
      const type = action.type.slice(namespace.length)
      const reducer = model.reducers[type]
      if(reducer) {
        return reducer(state, action.payload)
      }
    }
    return state
  }
}
