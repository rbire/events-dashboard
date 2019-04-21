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
  entity:'anonymous',
  recorder:"SIGN IN",
  events:{
    ledger:new Ledger('http://192.168.99.100:31481/'),
    blockHeight:0,
    showOnly:'1.0',
    startAt:'',
    counts:{        
      Events:{},
      Recorders:{},
      Entities:{},
      Dates:{}
    },
    data:[],
    callbacks:[]
  },
  handleChange:(state) => {
    context.entity = state.entity;
    context.recorder = state.recorder;
    context.events.startAt  = 0;
    context.events.showOnly = state.recorder;
    setTimeout(context.startMonitor,100);
  },
  startMonitor(){
    context.events.data=[];
    context.events.event_counts=[];
    context.events.recorder_counts=[];
    context.catalog.Sync(context.events.startAt,context.events.showOnly.split(" "), (tx, events,recorders) => {
      context.handleEvent(tx,events,recorders); 
    });                  
  },
  handleEvent:(tx,counts) => {
    context.events.blockHeight = tx.block;
    context.events.tx = tx;
    context.events.data.push(tx);
    context.events.counts = counts;
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
