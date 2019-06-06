import React, { Component } from 'react'
import EventRadarChart from './RadarChart';
import EventLineChart from './LineChart';
import EventCalendarChart from './CalendarChart'
import EventCalendar from './Calendar'
import EventBoard from './Board'
import EventBarChart from './BarChart';
import UserContext from './UserContext';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  baseline: {
    alignSelf: 'baseline',
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      marginLeft: 0
    }
  },
  inline: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  inlineRight: {
    width: '30%',
    textAlign: 'right',
    marginLeft: 50,
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      textAlign: 'center'
    }
  },
  backButton: {
    marginRight: theme.spacing.unit * 2
  }
})

class Ecm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        Events:[],
        Recorders:[],
        Entities:[],
        Dates:[],
        Hours:[],
      }
  }
   
  handleEvent(data){
    this.setState({
      ...data
    })
  }

  componentWillMount(){
    this.context.registerCountCallback(this.handleEvent.bind(this));
  }

  render() {
    const { classes } = this.props;    
    var {Hours,Dates,Recorders,Events,Entities} = this.state;
    return (      
      <Grid container spacing={24}>
      <Grid item xs={12} md={12} >
          <EventCalendarChart counts={Dates}/>
          <EventCalendar/>
      </Grid>
      <Grid item xs={12} md={12} >
          <EventLineChart counts={Hours}/>                    
      </Grid>
      <Grid item xs={12} md={5} >
          <EventRadarChart counts={Entities}/>
      </Grid>
      <Grid item xs={12} md={5} >
          <EventBarChart counts={Events} layout="horizontal" height={150}/>       
      </Grid>
      <Grid item xs={12} md={12} >
          <EventBarChart counts={Recorders} layout="vertical" height={500}/>
      </Grid>
      </Grid>
    )
  }
}
Ecm.contextType = UserContext;
export default withStyles(styles)(Ecm);