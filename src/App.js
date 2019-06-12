import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'
import UserContext from './components/common/UserContext';
import EventCatalog from './components/common/events';
import Ledger from './components/common/Ledger'
import { setTimeout } from 'timers';

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
  state : {
    cb:null,
    lanes:{},
    subjects:{}
  },
  catalog:new EventCatalog(
    'http://192.168.99.100:30598'
  ),
  system:'Event Test System',
  entity:'anonymous',
  recorder:"SIGN IN",
  events:{
    ledger:new Ledger('http://192.168.99.100:31481/'),
    showOnly:'',
    startAt:'Last',
    endAt:'Last',
    counts:{        
      Events:[],
      Recorders:[],
      Entities:[],
      Dates:[],
      Hours:[]
    },
    data:[],
    callbackTx:{},
    tx:{
      transaction:{
      }
    }
  }, init : () =>{
    context.events.data=[]
    context.state.lanes = {}
    context.state.subjects = {}
  },
  handleChange:(state) => {
    context.init()
    context.entity = state.entity
    context.recorder = state.recorder
    context.events.showOnly = state.recorder
    setTimeout(context.startMonitor,100);
  },
  startMonitor(){
    context.catalog.Sync(context.events.startAt,context.events.endAt, context.events.showOnly.split(" "), (tx) => {
      if(tx.block==context.events.startAt){
        context.init()
      }
      if(context.events.startAt=='Last'){
        var startAt = parseFloat(tx.block)-100
        context.events.startAt = startAt > 3?startAt:3
        setTimeout(context.startMonitor,100)
      }else{
        context.handleEvent(tx)
      } 
    });                  
  },
  handleEvent:(tx) => {
    context.events.tx = tx;    
    context.events.data.push(tx);

    //remove subject from old bucket
    var subject = context.state.subjects[tx.transaction.Subject] 
    if(subject != undefined){
      delete context.state.lanes[subject.state.Event].subjects[subject.state.Subject]
      subject.state = tx.transaction
      subject.events.push(tx.transaction)  
    }else{
      subject = {
        state : tx.transaction,
        events : [tx.transaction]
      }
      context.state.subjects[tx.transaction.Subject] = subject
    }
    //create new event bucket
    if(context.state.lanes[tx.transaction.Event]==undefined){
      context.state.lanes[tx.transaction.Event] = {
        count:0,
        actions:{},
        subjects:{},
      }
    }    
    //increament event count  
    var e = context.state.lanes[tx.transaction.Event];
    e.count += 1
    //set new subject
    e.subjects[tx.transaction.Subject] = tx.transaction
    //create event action bucket
    if(e.actions[tx.transaction.Action] == undefined){
        e.actions[tx.transaction.Action] = {
          count : 0
        }     
    }
    //increament event action count
    var a = e.actions[tx.transaction.Action]
    a.count+=1
    //callbacks
    if(context.state.cb){
       window.clearTimeout(context.state.cb)       
    }
    context.state.cb = window.setTimeout(context.runTxCallback,1000)
  },
  runTxCallback:()=>{
    Object.keys(context.events.callbackTx).forEach((k)=>{
      var cb = context.events.callbackTx[k];
      if(cb!=null){
        console.log(k)      
        cb()
      }
    })     
  },
  registerTxCallback:(key,cb)=>{
    context.events.callbackTx[key] = cb
  },
  unRegisterTxCallback:(key)=>{
    delete context.events.callbackTx[key];
  },
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
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
