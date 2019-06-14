import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import mappings from '../common/mappings.js'
import Icon from './EventIcon'
const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  baseline: {
    alignSelf: 'baseline',
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      marginLeft: 0
    }
  },
  inline: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  inlineRight: {
    width: '30%',
    textAlign: 'right',
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      textAlign: 'center'
    }
  },
  backButton: {
    marginRight: theme.spacing.unit * 2
  }
})

class Tx extends Component {
  goToEvent = event => {
    this.props.history.push({
      pathname: '/Event?subject=' + event.target.value,
      search: '#'
    })
  }

  render() {
    const { classes } = this.props;
    const tx = {};
    console.log(this.props.tx)
    Object.keys(this.props.tx).forEach(
        (col)=>
        {
            let key = (mappings[col]!='undefined' ? mappings[col]:col);
            let val = this.props.tx[col];
            tx[key] = val;
        })
    
    return (
      <div className={classes.root}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                    <Icon name={tx.Event}></Icon>
              </div>
              <div className={classes.inline}>
              <Typography style={{ textTransform: 'uppercase' }} color='secondary'>
                {tx.Event}&nbsp;{tx.Action}
                </Typography>
                <Typography variant="body2">
                  {tx.DateTime}
                </Typography>
              </div>
            </div>
            <div className={classes.inlineRight}>
              <Typography style={{ textTransform: 'uppercase' }}>
                {tx.Entity} {tx.Recorder}
              </Typography>
            </div>
            </div>
            <Divider />
      </div>
    )
  }
}

export default withStyles(styles)(Tx);
