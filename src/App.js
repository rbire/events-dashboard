import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'
import UserContext from './components/common/UserContext';
import EventCatalog from './components/common/events';

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
  entity:"Agent",
  recorder:"AGNT002",
  events:{
    host:'http://192.168.99.100:30598/',
    block:3,
    filter : [],
    data:[],
    counts:[],
    callbacks : []
  },
  handleChange:(state) => {
    context.entity = state.entity;
    context.recorder = state.recorder;
  },
  handleEvent:(tx,counts) => {
    context.events.tx = tx;
    context.events.data.push(tx);
    context.events.counts = Object.keys(counts).map((key, i) => {
      return {
        name: key,
        'Event': counts[key]
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
    let catalog = new EventCatalog(context.events.host);
    catalog.Sync(context.events.block,context.events.filter, (tx, counts) => {
      context.handleEvent(tx,counts); 
    });                  
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
