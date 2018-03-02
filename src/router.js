import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'

import models, { App } from './models'


const history = createHistory()

const store = createStore(
  combineReducers({
    ...models,
    router: routerReducer
  }),
  applyMiddleware(thunk, routerMiddleware(history)),
  applyMiddleware(store => next => action => {
    const result = next(action)
    return result instanceof Promise ? result.catch(err =>  store.dispatch(App.notify(err.message))) : Promise.resolve(result)
  })
)

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

class Comp extends React.Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Switch>
                <Route path='/admin/:key?' component={asyncComponent(() => import('./routes/admin'))} exact />
              </Switch>
              <Route path='/' component={asyncComponent(() => import('./routes/app'))} />
            </div>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null
    state = { Component: AsyncComponent.Component }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

export default Comp
