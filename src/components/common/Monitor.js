import React, { Component } from 'react'
import EventRadarChart from './RadarChart';
import EventLineChart from './LineChart';
import EventBarChart from './BarChart';
import UserContext from './UserContext';
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
      counts:{
      }
    }
  }
   
  handleEvent(){
    this.setState({
      counts:this.context.events.counts
    })
  }

  componentWillMount(){
    this.setState({
      counts:this.context.events.counts
    })
    this.context.registerCallback(this.handleEvent.bind(this));
  }

  render() {
    const { classes } = this.props;    
    var counts = this.state.counts;
    return (
      <div className={classes.root}>
          <EventLineChart counts={counts.Dates}/>
          <div className={classes.itemContainer}>
              <div className={classes.baseline}>
                <div className={classes.inline}>
                    <EventRadarChart counts={counts.Events} />       
                </div>
                <div className={classes.inline}>
                    <EventRadarChart counts={counts.Entities} />       
                </div>
              </div>
            </div>
            <EventBarChart counts={counts.Recorders}/>
      </div>
    )
  }
}
Ecm.contextType = UserContext;
export default withStyles(styles)(Ecm);