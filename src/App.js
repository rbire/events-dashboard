import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'
import UserContext from './components/common/UserContext';
import EventCatalog from './components/common/events';
import Ledger from './components/common/Ledger'
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

var context = {
  catalog:new EventCatalog('http://192.168.99.100:30598/'),
  system:'Event Test System',
  entity:"Agent",
  recorder:"AGNT002",
  events:{
    ledger:new Ledger('http://192.168.99.100:31481/'),
    showOnly:'Contract Signed',
    startAt:'',
    data:[],
    event_counts:[],
    recorder_counts:[],
    callbacks : []
  },
  handleChange:(state) => {
    context.entity = state.entity;
    context.recorder = state.recorder;
  },
  startMonitor(){
    context.events.data=[];
    context.events.event_counts=[];
    context.events.recorder_counts=[];
    context.catalog.Sync(context.events.startAt,context.events.showOnly.split(" "), (tx, events,recorders) => {
      context.handleEvent(tx,events,recorders); 
    });                  
  },
  handleEvent:(tx,events,recorders) => {
    context.events.tx = tx;
    context.events.data.push(tx);
    context.events.event_counts = Object.keys(events).map((key, i) => {
      return {
        name: key,
        'Event': events[key]
      }
    });
    context.events.recorder_counts = Object.keys(recorders).map((key, i) => {
      return {
        name: key,
        'Event': recorders[key]
      }
    });
    context.events.callbacks.forEach(cb=>{
      cb(tx)
    })
  },
  registerCallback:(cb)=>{
    context.events.callbacks.push(cb);
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    context.startMonitor();
  } 
  render() {
    return (
      <UserContext.Provider value={context}>
      <div>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </div>
      </UserContext.Provider>
    );
  }
}

export default App;
