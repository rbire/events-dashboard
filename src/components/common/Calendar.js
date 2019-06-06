import React, { Component } from "react";
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = Calendar.momentLocalizer(moment);
const styles = theme => ({
    App : {
        backgroundColor: '#000'
    }
})

var resources ={}
var resourceMap = []
function mapResource(e){
    if(resources[e]==undefined){
        resources[e] = resourceMap.length;
        resourceMap.push(
            { resourceId: resourceMap.length, resourceTitle: e });
    }
    return resources[e];
}

function MonthEvent({ event }) {
    return (
      <span>
        {event.desc}
      </span>
    )
  }
  function DayEvent({ event }) {
    return (
      <span>
        {event.desc}
      </span>
    )
  }
  function WeekEvent({ event }) {
    return (
      <span>
        {event.desc}
      </span>
    )
  }
  
  function AgendaEvent({ event }) {
    return (
      <span>
         {event.summary} <strong>{event.title}</strong>
      </span>
    )
}

class EventCalendar extends Component {
  constructor(props) {
    super(props)
    this.state ={     
        events: [], map:[]
    }
  }
   
  handleEvent(tx){
    var start = new Date(tx.transaction.DateTime);
    console.log(start);
    this.setState({
        events : this.state.events.concat({
        resourceId : mapResource(tx.transaction.Event),
        start: start,
        end : start,
        title : tx.transaction.Subject,
        desc: tx.transaction.Event + ' ' + tx.transaction.Action,
        summary: tx.transaction.Event + ' ' + tx.transaction.Action + ' recorded by ' + tx.transaction.Entity + ' ' + tx.transaction.Recorder + ' for ' + tx.transaction.SubjectType
      }),
      map : [...resourceMap]
    })
  }

  componentWillMount(){
    this.context.registerTxCallback(this.handleEvent.bind(this));
  }

  render() {
    return (
        <Calendar
          popup
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={this.state.events}
          resources={this.state.map}
          defaultView={Calendar.Views.AGENDA}
          views={[Calendar.Views.AGENDA, Calendar.Views.MONTH, Calendar.Views.DAY]}
          components={{
            day: { event: DayEvent},
            week: { event: WeekEvent},
            month: { event: MonthEvent},
            agenda: { event: AgendaEvent},
          }}          
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"          
          style={{ height: "100vh" }}
        />
    );
  }
}
EventCalendar.contextType = UserContext;
export default withStyles(styles)(EventCalendar);
