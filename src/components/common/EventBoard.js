import React, {Component} from 'react'
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import LaneCard from '../cards/LaneCard'
import TimeCard from '../cards/TimeCard'
import Count from '../cards/Count'
import Icon from '../cards/EventIcon'

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        width: '100%',
        overflow:'auto',
        margin:-1,    
        padding:1,
        flex:1
    },
    itemContainer: {
      transition: 'width 100ms ease-in-out'
    },
    count:{
        backgroundColor:'#125292',
        minHeight:'10vh',
        flex:1,
        overflow:'auto',
        textAlign: 'center',
        fontWeight:'normal',
        color:'#fff',
        padding:theme.spacing.unit * 1,
        margin:1,
        borderRadius:0    
    }    
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

    handleEvent(){
        this.setState({ refresh:true })
    }

    render() {
        const { classes } = this.props
        var subjects = Object.keys(this.context.state.subjects)
        var subject_items = subjects.map(v=>{
            return(
                <Grid item xs={1} >
                    <TimeCard key={v} subject={this.context.state.subjects[v]}/>
               </Grid>          
            )
        })
        var lanes = Object.keys(this.context.state.lanes)
        var lane_items = lanes.map(v=>{
            return(
                <LaneCard key={v} lane={v}/>
            )
        })
        var event_counts = lanes.map(v=>{
            var actions = Object.keys(this.context.state.lanes[v].actions)
            var action_items = actions.map(a=>{
                return(
                    <Grid item xs={12} >
                    <Count key={a} label={a} lane={v} action={a}/>
                    </Grid>
                )
            })
            return (
                    <Grid item xs={12}>
                        <Grid container spacing={0} >
                            <Grid item xs={1}>
                                <Icon name={v}></Icon>                            
                            </Grid>
                            <Grid item xs={11} style={{textAlign:'center'}}>
                                {v}
                                {action_items}                
                            </Grid>
                        </Grid>
                    </Grid>
            )
        })
        return (
            <Grid container justify="left">
                <Grid item xs={12}>                    
                    <div className={classes.root} style={{height:'10vh'}}>
                    {event_counts}
                    </div>
                </Grid>
                <Grid item xs={12} >
                    <div className={classes.root} style={{height:'80vh'}}>
                    {lane_items}
                    </div>
                </Grid>
                <Grid item xs={12}>                    
                    <div className={classes.root} style={{height:'10vh'}}>
                    {subject_items}    
                    </div>
                </Grid>

            </Grid>  
        )
    }
}
EventBoard.contextType = UserContext;
export default withStyles(styles)(EventBoard)