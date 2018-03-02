import React from 'react'

import { withStyles } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'

import Edit from 'material-ui-icons/Edit'
import Add from 'material-ui-icons/Add'
import Delete from 'material-ui-icons/Delete'

const styles = theme => ({
  Flex: {
    display: 'flex'
  },
  Paper: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%'
  },
  Container: {
    overflow: 'auto'
  },
  Spacer: {
    flex: '1 1 100%',
  },
  Nested1: {
    paddingLeft: theme.spacing.unit * 4
  },
  Nested2: {
    paddingLeft: theme.spacing.unit * 8
  },
  TableCell: {
    maxWidth: 200,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
})

class Comp extends React.Component {
  state={
    searchText: '',
    goodCreated: {},
    goodSelected: {},
    goodUpdated: {},
    createDialogShown: false,
    updateDialogShown: false,
    deleteDialogShown: false
  }

  render() {
    const { goods, classes, onUpdate, onCreate, onDelete } = this.props
    const { searchText, goodCreated, goodSelected, goodUpdated, createDialogShown, updateDialogShown, deleteDialogShown } = this.state

    return (
      <Paper className={classes.Paper}>
        <Toolbar>
          <div>
            <Typography type='headline'>{goods.length}</Typography>
          </div>
          <div className={classes.Spacer} />
          <div>
            <IconButton title="Add" onClick={() => this.setState({ createDialogShown: true, goodCreated: {} })}>
              <Add />
            </IconButton>
          </div>
          <div>
            <Input placeholder="Search" onChange={e => this.setState({ searchText: e.target.value })} />
          </div>
        </Toolbar>
        <div className={classes.Container}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                {Object.keys(goods[0] || {}).map(key => <TableCell key={key}>{key}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {goods.filter(item => Object.keys(item).filter(key => `${item[key]}`.includes(searchText)).length).map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className={classes.Flex}>
                      <IconButton title="Update" onClick={() => this.setState({ updateDialogShown: true, goodSelected: item, goodUpdated: {} })}>
                        <Edit />
                      </IconButton>
                      <IconButton title="Delete" onClick={() => this.setState({ deleteDialogShown: true, goodSelected: item })}>
                        <Delete />
                      </IconButton>
                    </div>
                  </TableCell>
                  {Object.keys(goods[0] || {}).map(key => {
                    return <TableCell key={key} className={classes.TableCell}>{item[key]}</TableCell>
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog
          open={updateDialogShown}
          transition={Transition}
          onClose={() => this.setState({ updateDialogShown: false })}
          fullWidth
        >
          <DialogTitle>UPDATE {goodSelected.id}</DialogTitle>
          <DialogContent>
            {Object.keys(goodSelected).filter(key => key !== 'id').map(key => (
              <TextField
                key={key}
                label={key}
                value={`${goodSelected[key] == null ? '' : goodSelected[key]}`}
                placeholder="eidt"
                fullWidth
                onChange={e => this.setState({
                  goodSelected: {
                    ...goodSelected,
                    [key]: e.target.value
                  },
                  goodUpdated: {
                    ...goodUpdated,
                    [key]: e.target.value
                  }
                })}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => {
              this.setState({ updateDialogShown: false })
              onUpdate(goodSelected, goodUpdated)
            }}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={createDialogShown}
          transition={Transition}
          onClose={() => this.setState({ createDialogShown: false })}
          fullWidth
        >
          <DialogTitle>CREATE</DialogTitle>
          <DialogContent>
            {['brand', 'type', 'size', 'price', 'description', 'details'].map(key => (
              <TextField
                key={key}
                label={key}
                placeholder="eidt"
                fullWidth
                onChange={e => this.setState({
                  goodCreated: {
                    ...goodCreated,
                    [key]: e.target.value
                  }
                })}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => {
              this.setState({ createDialogShown: false })
              onCreate(goodCreated)
            }}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteDialogShown}
          transition={Transition}
          onClose={() => this.setState({ deleteDialogShown: false })}
          fullWidth
        >
          <DialogTitle>DELETE</DialogTitle>
          <DialogContent>Are you sure to remove item {goodSelected.id} ?</DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => {
              this.setState({ deleteDialogShown: false })
              onDelete(goodSelected)
            }}>Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}

const Transition = props => <Slide direction="down" {...props} />

export default withStyles(styles)(withWidth()(Comp))
