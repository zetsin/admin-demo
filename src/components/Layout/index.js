import React from 'react'

import { withStyles } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import AppBar from 'material-ui/AppBar'
import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

const width = 300

const styles = theme => ({
  Sider: {
    width: width
  },
  SiderPaper: {
    width: width,
    position: 'fixed'
  },
  SiderContent: {
    overflow: 'scroll'
  },
  Header: {
    flexFlow: 'row',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: width
    }
  },
  Body: {
    padding: theme.spacing.unit * 3,
    marginTop: 64,
    [theme.breakpoints.up('lg')]: {
      marginLeft: width
    }
  }
})

class Comp extends React.Component {
  state = {
    open: false
  }

  componentWillReceiveProps(props) {
    this.setState({
      open: false
    })
  }

  render() {
    const {
      brand,
      sider,
      header,
      body,
      children,
      classes,
      width,
    } = this.props

    return (
      <div>
        <Drawer
          variant={['xs', 'sm', 'md'].includes(width) ? 'temporary' : 'permanent'}
          open={this.state.open}
          className={classes.Sider}
          classes={{
            paper: classes.SiderPaper,
          }}
          onClose={() => this.setState({ open: !this.state.open })}
        >
          <div>
            {brand}
          </div>
          <div>
            <Divider />
          </div>
          <div className={classes.SiderContent}>
            {sider}
          </div>
        </Drawer>
        <AppBar className={classes.Header}>
          <Hidden lgUp>
            <IconButton
              className={classes.menuButton}
              color="default"
              aria-label="Menu"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {header}
        </AppBar>
        <div className={classes.Body}>
          {body}
        </div>
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(withWidth()(Comp))
