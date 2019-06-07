
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import UserContext from '../common/UserContext';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    backgroundColor:'#125292',
    minWidth:200,
    maxWidth:200,
    minHeight:250,
    overflow:'auto',
    textAlign: 'left',
    fontWeight:'bold',
    color:'darkgrey',
    padding:theme.spacing.unit * 1,
    margin:theme.spacing.unit * 1,

  },
  card: {
    marginTop:theme.spacing.unit * 1,
    padding: theme.spacing.unit * 1,
    backgroundColor:'#fff',
    borderRadius:5
  },
})

class LaneCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        cards:{}
    }
  }  

  goToEvent = event => {
    this.props.history.push({
      pathname: '/event?subject=' + event.target.value,
      search: '#'
    })
  }

  componentWillMount(){
    this.context.registerTxCallback(this.handleEvent.bind(this));       
  }    

  handleEvent(newCard){
      var lane = newCard.transaction.Event
      var subject = newCard.transaction.Subject
      var cards = this.state.cards;
      if(cards[subject]!=undefined){
        delete cards[subject]
      }
      if(lane==this.props.lane){
          cards[subject] = newCard
      }
      this.setState({cards})
  }
    
  render() {
    const { classes } = this.props;
    var cards = Object.keys(this.state.cards).map(v=>{
        const tx = this.state.cards[v];
        const eventLink="/ledger?subject="+tx.transaction.Subject;
        return (      
          <Paper className={classes.card}>
              <Link component={RouterLink} to={eventLink} style={{ fontSize: '30%' }}>
                #{tx.transaction.Subject}               
              </Link>
              <Typography style={{ textTransform: 'uppercase',fontSize: '30%' }}  gutterBottom>
                  <strong>{tx.transaction.Action}</strong> : {tx.transaction.DateTime}           
              </Typography>
          </Paper>
        )
    })
    return (
      <Paper className={classes.paper}>
        {this.props.lane}
        {cards}
      </Paper>
    )
  }
}
LaneCard.contextType = UserContext
export default withStyles(styles)(LaneCard)
