
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import UserContext from '../common/UserContext';
import Icon from '../cards/EventIcon'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
      fontSize:'8pt',
      backgroundColor:'#000',
      minHeight:100,
      minWidth:135,
      overflow:'auto',
      textAlign: 'center',
      fontWeight:'normal',
      color:'#fff',
      padding:theme.spacing.unit * 1,
      margin:0,
} 
})

class TimeCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }      
  render() {
    const { classes, subject } = this.props;
    var cards = subject.events.map(transaction=>{
        return (
                <Icon name={transaction.Event} small></Icon>
        )
    })
    return (
      <Grid container spacing={3} xs={12} className={classes.card}>
            <Grid item xs={12}>
                {subject.state.Subject}
            </Grid>
            <Grid item xs={12}>
                {cards}
            </Grid>
            <Grid item xs={12}>
                {subject.state.Event}  {subject.state.Action}
            </Grid>
      </Grid>
    )
  }
}
TimeCard.contextType = UserContext
export default withStyles(styles)(TimeCard)
