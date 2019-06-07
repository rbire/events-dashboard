import React, {Component} from 'react'
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import LaneCard from '../cards/LaneCard'
import TimeCard from '../cards/TimeCard'
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    itemContainer: {
      transition: 'width 100ms ease-in-out'
    },
})
class EventBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lanes:{},
            subjects:{}
        }
    }

    componentWillMount(){
        this.context.registerTxCallback(this.handleEvent.bind(this));       
    }    

    handleEvent(card){
        var lane = card.transaction.Event
        var subject = card.transaction.Subject
        if(this.state.lanes[lane]==undefined)
        {
            var lanes=this.state.lanes
            lanes[lane] = lane + ' Lane'
            this.setState({lanes})
        }
        if(this.state.subjects[subject]==undefined)
        {
            var subjects=this.state.subjects
            subjects[subject] = subject + ' Timeline'
            this.setState({subject})
        }
    }

    render() {
        const { classes } = this.props;
        var lanes = Object.keys(this.state.lanes);
        var subjects = Object.keys(this.state.subjects);
        var lane_items = lanes.map(v=>{
            return(
                <Grid item> 
                      <LaneCard key={v} lane={v}/>
                </Grid>
            )
        })
        var subject_items = subjects.map(v=>{
            return(
                <Grid item xs={12}> 
                      <TimeCard key={v} subject={v}/>
                </Grid>
            )
        })
        return (
            <Grid container justify="left">
                <Grid spacing={24} alignItems="left" justify="left" container className={classes.grid}>
                    {lane_items}    
                </Grid>
                <Paper className={classes.paper} style={{backgroundColor:'#5b5d5f', padding:10, margin:10}}>
                <Grid spacing={24} alignItems="left" justify="left" container className={classes.grid}>
                        {subject_items}    
                </Grid>
                </Paper>
            </Grid>  
        )
    }
}
EventBoard.contextType = UserContext;
export default withStyles(styles)(EventBoard)