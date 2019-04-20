import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
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
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  inlineRight: {
    width: '30%',
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
        <Paper className={classes.paper}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Typography variant="h6" gutterBottom>
                  {tx.block}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                  Event
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {tx.transaction.Event}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {tx.transaction.Action}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {tx.transaction.DateTime}
                </Typography>
              </div>
            </div>
            <div className={classes.inlineRight}>
              <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                Subject
              </Typography>
              <Typography variant="h6" gutterBottom>
              <Link component={RouterLink} to={eventLink}>
                {tx.transaction.Subject}
              </Link>
              </Typography>
              <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                Recorder
              </Typography>
              <Typography variant="h6" gutterBottom>
                {tx.transaction.Recorder}
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(CardItem);
