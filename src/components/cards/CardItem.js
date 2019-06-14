import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Icon from './EventIcon'
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
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
    width:'70%',
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
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  inlineRight: {
    width: '20%',
    textAlign: 'right',
    marginLeft: 50,
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

class CardItem extends Component {
  goToEvent = event => {
    this.props.history.push({
      pathname: '/event?subject=' + event.target.value,
      search: '#'
    })
  }

  render() {
    const { classes } = this.props;
    const tx = this.props.tx;
    const eventLink="/ledger?subject="+tx.transaction.Subject;
    return (
      <div className={classes.root}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Icon name={tx.transaction.Event}/>
                <Typography style={{fontSize:'50%'}}>
                  #{tx.block}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography style={{ textTransform: 'uppercase' }}  >
                {tx.transaction.Event} {tx.transaction.Action}
                </Typography>
                posted by {tx.transaction.Recorder}
              </div>
            </div>
            <div className={classes.inlineRight}>
               <Link component={RouterLink} to={eventLink}>
              <Typography style={{ textTransform: 'uppercase' }} color='secondary' >
              {tx.transaction.Subject}             
            </Typography>
            </Link>
            </div>
          </div>
          <Divider />
      </div>
    )
  }
}

export default withStyles(styles)(CardItem);
