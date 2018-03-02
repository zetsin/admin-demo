import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import Home from 'material-ui-icons/Home'
import ShoppingCart from 'material-ui-icons/ShoppingCart'

import Layout from '../../components/Layout'
import GoodsTable from '../../components/GoodsTable'

import { Goods } from '../../models'

const styles = theme => ({
  Brand: {
    justifyContent: 'center'
  },
  Selected: {
    background: theme.palette.grey[300]
  },
  Header: {
    flex: 1
  },
  HeaderTitle: {
    flex: 1,
    overflow: 'hidden',
    color: theme.palette.common.white
  }
})

class Comp extends React.Component {
  state = {
    anchorEl: null,
    menuOpen: false
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props

    dispatch(Goods.retrieve())
  }

  render() {
    const { goods, classes, match, dispatch } = this.props

    const tabs = {
      'Goods': {
        icon: <ShoppingCart />,
        body: (
          <GoodsTable
            goods={Object.keys(goods).map(key => goods[key])}
            onUpdate={(selectedGood, updatedGood) => {
              dispatch(Goods.update({
                ...selectedGood,
                ...updatedGood
              }))
            }}
            onCreate={(createdGood) => {
              dispatch(Goods.create(createdGood))
            }}
            onDelete={(selectedGood) => {
              dispatch(Goods.delete(selectedGood.id))
            }} />
        )
      }
    }

    return (
      <Layout brand={
        <Toolbar className={classes.Brand}>
          <Link to="/admin">
            <Typography variant="headline" color="secondary" noWrap>
              ADMIN
            </Typography>
          </Link>
        </Toolbar>
      } sider={
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText inset primary={document.title} />
            </ListItem>
          </Link>
          {Object.keys(tabs).map(key => (
            <Link key={key} to={`/admin/${key}`} className={classes.Link}>
              <ListItem
                button
                className={match.params.key === key ? classes.Selected : ''}
              >
                <ListItemIcon>
                  {tabs[key].icon}
                </ListItemIcon>
                <ListItemText inset primary={key} />
              </ListItem>
            </Link>
          ))}
        </List>
      } header={
        <Toolbar className={classes.Header}>
          <Link to={match.url} className={classes.HeaderTitle}>
            <Typography variant="title" color="inherit" noWrap>
              {match.params.key || 'Select a menu item'}
            </Typography>
          </Link>
          <div>
            <Link to='/signin'>
              <Button color="secondary">Signin</Button>
            </Link>
            <Link to='/signup'>
              <Button color="secondary">Signup</Button>
            </Link>
          </div>
        </Toolbar>
      } body={tabs[match.params.key] && tabs[match.params.key].body}>
      </Layout>
    )
  }
}

export default withStyles(styles)(connect(state => state)(Comp))
