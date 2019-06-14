
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
    backgroundColor:'#ececec',
    minWidth:'15%',
    minHeight:100,
    overflow:'auto',
    textAlign: 'left',
    fontWeight:'bold',
    color:'darkgrey',
    margin:theme.spacing.unit * 1,
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
    }
  }  

  goToEvent = event => {
    this.props.history.push({
      pathname: '/event?subject=' + event.target.value,
      search: '#'
    })
  }
    
  render() {
    const { classes, lane } = this.props
    const lane_item = this.context.state.lanes[lane]
    var cards = Object.keys(lane_item.subjects).map(v=>{
        const tx = lane_item.subjects[v];
        const eventLink="/ledger?subject="+tx.Subject;
        const days = Math.ceil((new Date() - new Date(tx.DateTime))/(1000 * 60 * 60 * 24))
        var daystyle={
          fontWeight:'bold',
          color:'#125292'
        }
        var daylabel = 'Today';
        if(days>1) daylabel = days==2 ? 'Yesterday' : (days + ' days ago')
        if(days>4) daystyle['color'] = 'orange';
        if(days>8) daystyle['color'] = 'red';
        return (
        <Grid container spacing={3} className={classes.card}>
          <Grid item  item xs={1}>
                <Icon name={this.props.lane}></Icon>
          </Grid>
          <Grid item xs={11} sm container>
                <Grid item xs container direction="column" spacing={2}>
                      <Grid item>
                    <Typography style={{ textTransform: 'uppercase',fontSize: '80%' }}>
                      <Link component={RouterLink} to={eventLink} >
                        #{tx.Subject}
                      </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                          <Typography style={{ textTransform: 'uppercase',fontSize: '30%' }}>
                          {tx.Event} {tx.Action}  <span style={daystyle}> {daylabel}    </span>          
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
