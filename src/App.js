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
  catalog:new EventCatalog(
    'http://192.168.99.100:30598'
  ),
  system:'Event Test System',
  entity:'anonymous',
  recorder:"SIGN IN",
  events:{
    ledger:new Ledger('http://192.168.99.100:31481/'),
    showOnly:'',
    startAt:'',
    counts:{        
      Events:[],
      Recorders:[],
      Entities:[],
      Dates:[],
      Hours:[]
    },
    data:[],
    callbackTx:[],
    callbackCount:[],
    tx:{
      transaction:{
      }
    }
  },
  handleChange:(state) => {
    context.entity = state.entity;
    context.recorder = state.recorder;
    //context.events.startAt  = 0;
    context.events.showOnly = state.recorder;
    setTimeout(context.startMonitor,100);
  },
  startMonitor(){
    context.events.data=[];
    context.catalog.Sync(context.events.startAt,context.events.showOnly.split(" "), (tx) => {
      if(context.events.startAt==''){
        var startAt = parseFloat(tx.block)-100
        context.events.startAt = startAt > 0?startAt:0
        setTimeout(context.startMonitor,100)
      }else{
        context.handleEvent(tx)
      } 
    });                  
  },
  handleEvent:(tx) => {
    context.events.tx = tx;
    context.events.data.push(tx);
    context.events.callbackTx.forEach(cb=>{
      cb(tx)
    })    
  },
  handleCounts:(counts) => {
    context.events.counts = counts;
    context.events.callbackCount.forEach(cb=>{
      cb(counts)
    })
  },
  registerTxCallback:(cb)=>{
    context.events.callbackTx.push(cb);
    context.events.data.forEach(tx=>{
      cb(tx)
    })
  },
  registerCountCallback:(cb)=>{
    context.events.callbackCount.push(cb);
    cb(context.events.counts);
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
