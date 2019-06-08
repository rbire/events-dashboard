
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import UserContext from '../common/UserContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  card: {
    color:'#101010',
    fontSize:'8pt',
    padding:2,
  },
  paper:{
    fontSize:'10pt',
    minWidth:'20%',
    margin:1,
    borderRadius:0
  }
})

class TimeCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        cards:[]
    }
  }  
  componentWillMount(){
    this.context.registerTxCallback(this.handleEvent.bind(this));       
  }    

  handleEvent(newCard){
      var subject = newCard.transaction.Subject
      if(subject==this.props.subject){
      var cards = this.state.cards
      cards.push(newCard)
      this.setState({cards})
      }
  }
    
  render() {
    const { classes } = this.props;
    var cards = this.state.cards.map(tx=>{
        return (      
          <div className={classes.card}> 
              {tx.transaction.Event} {tx.transaction.Action}           
          </div>
        )
    })
    return (
          <Paper className={classes.paper}>
              #{this.props.subject}
              {cards}
          </Paper>
    )
  }
}
TimeCard.contextType = UserContext
export default withStyles(styles)(TimeCard)
