import React, {Component} from 'react'
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import LaneCard from '../cards/LaneCard'
import TimeCard from '../cards/TimeCard'
import Count from '../cards/Count'
const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        width: '100%',
        overflow:'scroll',
        height:800, 
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
            refresh:false
        }
    }

    componentWillMount(){
        this.context.registerTxCallback('EventBoard', this.handleEvent.bind(this));       
    }    
    componentWillUnmount(){
        this.context.unRegisterTxCallback('EventBoard');       
    }    

    handleEvent(card){
        this.setState({ card })
    }

    render() {
        const { classes } = this.props
        var lanes = Object.keys(this.context.state.lanes)
        var lane_items = lanes.map(v=>{
            return(
                <LaneCard key={v} lane={v}/>
            )
        })
        return (
            <Grid container justify="left">
                <Grid item><Count label="Applications" lane="Application" action="Started"/></Grid>
                <Grid item><Count label="ICA Signed" lane="ICA" action="Signed"/></Grid>
        <Grid item><Count label="Joined" lane="Firm" action="Joined"/></Grid>

                <div className={classes.root}>
                {
                    lane_items
                }    
                </div>
                {/*}
                <div className={classes.root}>
                    {subject_items}    
        </div>*/}
            </Grid>  
        )
    }
}
EventBoard.contextType = UserContext;
export default withStyles(styles)(EventBoard)