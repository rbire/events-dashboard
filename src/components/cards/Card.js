import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import UserContext from '../common/UserContext';

const styles = theme => ({
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

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {tx:{transaction:{}}}
  }

  handleEvent(data){
    this.setState(
      {tx:data}
    )
  }

  componentWillMount(){
    this.context.registerTxCallback(this.handleEvent.bind(this));
  }                  


  goToEvent = event => {
    this.props.history.push({
      pathname: '/event?subject=' + event.target.value,
      search: '#'
    })
  }
  
  render() {
    const { classes } = this.props;
    const {tx} = this.context.events;
    const eventLink="/ledger?subject="+tx.transaction.Subject;
    return (
      <div className={classes.root}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Typography variant="body2" gutterBottom>
                <Link component={RouterLink} to={eventLink}>
                  {tx.transaction.Subject}
                </Link>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {tx.transaction.Event} {tx.transaction.Action} recorded by {tx.transaction.Recorder}
                </Typography>
                <Typography variant="body2" gutterBottom>
                Block#{tx.block}
                </Typography>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
Card.contextType = UserContext;
export default withStyles(styles)(Card);
