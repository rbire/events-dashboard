
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import UserContext from '../common/UserContext';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    backgroundColor:'#fff',
    color:'#101010',
    borderRadius:0,
    fontSize:'6pt'
  },
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
          <Grid item md={1} className={classes.card}> 
                {tx.transaction.Event} {tx.transaction.Action}           
          </Grid>
        )
    })
    return (
        <Grid alignItems="left" justify="left" container className={classes.grid}>
              <Grid item md={1} className={classes.card} style={{fontWeight:'bold'}}> 
                    #{this.props.subject}
              </Grid>
              {cards}
        </Grid>        
    )
  }
}
TimeCard.contextType = UserContext
export default withStyles(styles)(TimeCard)
