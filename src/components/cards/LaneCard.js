
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import UserContext from '../common/UserContext';
import Icon from './EventIcon'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    backgroundColor:'#125292',
    minWidth:'15%',
    minHeight:100,
    overflow:'auto',
    textAlign: 'left',
    fontWeight:'bold',
    color:'darkgrey',
    padding:theme.spacing.unit * 1,
    margin:1,
    borderRadius:0
  },
  card: {
    padding: theme.spacing.unit * 1,
    backgroundColor:'#fff',
    borderRadius:0,
    margin:1
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
        <Grid container spacing={2} className={classes.card}>
          <Grid item>
                <Icon name={this.props.lane}></Icon>
          </Grid>
          <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                            <strong>{tx.transaction.Event} {tx.transaction.Action}</strong>                 
                    </Grid>
                    <Grid item xs>
                    <Link component={RouterLink} to={eventLink} >
                    #{tx.transaction.Subject}
                    </Link>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textTransform: 'uppercase',fontSize: '30%' }}  gutterBottom>
                            {tx.transaction.DateTime}           
                        </Typography>
                    </Grid>
               </Grid> 
            </Grid>
         </Grid>
        )
    })
    return (
      <div className={classes.paper}>
        {this.props.lane}
        {cards}
      </div>
    )
  }
}
LaneCard.contextType = UserContext
export default withStyles(styles)(LaneCard)
