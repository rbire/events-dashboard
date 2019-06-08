import React, {Component} from 'react'
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import LaneCard from '../cards/LaneCard'
import TimeCard from '../cards/TimeCard'
const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        width: '100%',
        overflow:'scroll',
        height:450, 
        padding:theme.spacing.unit * 1,
        margin:1,    
    },
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
                <LaneCard key={v} lane={v}/>
            )
        })
        var subject_items = subjects.map(v=>{
            return(
                <TimeCard key={v} subject={v}/>
            )
        })
        return (
            <Grid container justify="left">
                <div className={classes.root}>
                {lane_items}    
                </div>
                <div className={classes.root} style={{height:350}}>
                    {subject_items}    
                </div>
            </Grid>  
        )
    }
}
EventBoard.contextType = UserContext;
export default withStyles(styles)(EventBoard)