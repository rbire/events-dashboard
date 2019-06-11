
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
        return (
        <Grid container spacing={2} className={classes.card}>
          <Grid item>
                <Icon name={this.props.lane}></Icon>
          </Grid>
          <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                            <strong>{tx.Event} {tx.Action}</strong>                 
                    </Grid>
                    <Grid item xs>
                    <Link component={RouterLink} to={eventLink} >
                    #{tx.Subject}
                    </Link>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textTransform: 'uppercase',fontSize: '30%' }}  gutterBottom>
                            {tx.DateTime}           
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
