import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Snackbar from 'material-ui/Snackbar'

import { App } from '../../models'

const styles = {}

class Comp extends React.Component {
  state = {
    prehash: ''
  }

  render() {
    const { app, dispatch } = this.props

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={!!app.message}
          onRequestClose={() => {
            dispatch(App.notify())
          }}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{app.message}</span>}
        />
      </div>
    )
  }

  componentDidUpdate() {
    const { prehash } = this.state
    const { hash } = window.location

    if(prehash !== hash) {
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.slice(1))
          if (element) {
            element.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'})
          }
        })
      } else {
        window.scrollTo(0, 0)
      }

      this.setState({
        prehash: hash
      })
    }
  }
}

export default withStyles(styles)(connect(state => state)(Comp))
