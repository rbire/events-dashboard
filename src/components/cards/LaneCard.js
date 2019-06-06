
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
})

class LaneCard extends Component {
  goToEvent = event => {
    this.props.history.push({
      pathname: '/event?subject=' + event.target.value,
      search: '#'
    })
  }

  render() {
    const { classes } = this.props;
    const tx = this.props;
    const eventLink="/ledger?subject="+tx.transaction.Subject;
    return (
      <div className={classes.root}>
            <Link component={RouterLink} to={eventLink}>
              <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                {tx.transaction.Subject}             
             </Typography>
            </Link>
            <Typography style={{ textTransform: 'uppercase' }}  gutterBottom>
            {tx.transaction.Action}             #{tx.block} {tx.transaction.Recorder}
            </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(LaneCard);
