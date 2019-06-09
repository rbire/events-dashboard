
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import PersonIcon from '@material-ui/icons/Person';
import withStyles from '@material-ui/core/styles/withStyles';
import UserContext from '../common/UserContext';


import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  card: {
    color:'#101010',
    fontSize:'8pt',
    padding:0,
  },
  paper:{
    fontSize:'10pt',
    width:'15%',
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
          <ListItem className={classes.card}>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText secondary={tx.transaction.Event +' '+ tx.transaction.Action}/>
        </ListItem>     
        )
    })
    return (
          <Paper className={classes.paper}>
              <List component="nav" aria-label="Main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                  <ListItemText primary={this.props.subject} />
                 </ListItem>          
                  {cards}
              </List>              
          </Paper>
    )
  }
}
TimeCard.contextType = UserContext
export default withStyles(styles)(TimeCard)
