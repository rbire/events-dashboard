import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import UserContext from '../common/UserContext';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    backgroundColor:'#125292',
    minWidth:'15%',
    minHeight:50,
    overflow:'auto',
    textAlign: 'left',
    fontWeight:'bold',
    color:'#fff',
    padding:theme.spacing.unit * 1,
    margin:1,
    borderRadius:0
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
      <Paper className={classes.paper}>
            <Typography gutterBottom>
            {label}
            </Typography>
            {count}
      </Paper>
    )
  }
}
Count.contextType = UserContext;
export default withStyles(styles)(Count);
