import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import UserContext from '../common/UserContext';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { formatWithOptions } from 'util';

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color:'#000',
    fontSize:'60%'
  },
})

class Count extends Component {
  constructor(props){
    super(props);
  }
 
  render() {
    const { classes, label, lane, action } = this.props
    var count = 0;
    var l = this.context.state.lanes[lane]
    if(l!= undefined){
        if(l.actions[action]!=undefined){
          count = l.actions[action].count
        }
    }
    return (
            <Typography className={classes.paper}>{label}(<strong>{count}</strong>)</Typography>
    )
  }
}
Count.contextType = UserContext;
export default withStyles(styles)(Count);
