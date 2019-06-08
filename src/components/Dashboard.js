import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from './common/Loading';
import Topbar from './Topbar';
import Ecm from './common/Monitor';
import UserContext from './common/UserContext';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {Events, Entities, EntityEvents} from './common/Lookups';
import Button from '@material-ui/core/Button';
import Card from './cards/Card';

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.trigger = null;
    this.state = {
        startAt:'',
        showOnly:'',
        loading: false
    }
    this.randomPost = this.randomPost.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);

  }
  
  handleConfirmation(id){
      console.log(id);
  }
  
  randomPost(){
    var n = Math.ceil(Math.random()*10);
    var subject = 'US-'+Math.floor(Math.random()*40000)+'-' + Math.floor(Math.random()*50000) + '-' + Math.floor(Math.random()*200000) + '-R-N';
    var system = 'Event Test System';
    var entity = Object.keys(EntityEvents)[n%Object.keys(EntityEvents).length];
    var event = EntityEvents[entity][n%EntityEvents[entity].length];
    var state = Events[event][n%Events[event].length];
    var recorder = Entities[entity][n%Entities[entity].length];
    var date = new Date();
    date.setHours(n);
    var tx = {
      'arg_0':subject,
      'arg_1':system,
      'arg_2':'Property',
      'arg_3':entity,
      'arg_4':event,
      'arg_5':state,
      'arg_6':date,
      'arg_7':'TestNet',
      'arg_8':'1.0',
      'arg_9':recorder
      }
    this.context.events.ledger.recordEvents(tx, this.handleConfirmation);    
  }

  handleChange = prop => event => {
    this.context.events[prop] = event.target.value;

    clearTimeout(this.trigger);
    this.trigger = setTimeout(function() {
      this.setState({
        loading:false
      });
      this.context.startMonitor();
    }.bind(this), 2000);
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const currentPath = this.props.location.pathname;
    const {startAt, showOnly} = this.context.events;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <Ecm/>


        {/*<div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
             <Grid item xs={12} md={3}>
                  <TextField
                    label="Sync from e.g. 0, 10 or 100..."
                    id="start"
                    defaultValue={startAt} fullWidth={true}
                    onChange={this.handleChange('startAt')}
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Block#</InputAdornment>,
                    }}
                  />
              </Grid>
              <Grid item xs={12} md={3}>
                  <TextField
                    label="e.g. Price, Offer, Contract etc."
                    id="show"
                    defaultValue={showOnly} fullWidth={true}
                    onChange={this.handleChange('showOnly')}
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Filter</InputAdornment>,
                    }}
                  />
              </Grid>
              <Grid item xs={12} md={4}>
                    <Card  />
              </Grid>
              <Grid item xs={12} md={2}>
                  <Button onClick={this.randomPost} color='primary' variant="contained" className={classes.actionButtom}>
                    Click To Post A Random Event
                  </Button>
              </Grid>
                        
            </Grid>
          </Grid>
        </div>*/}
      </React.Fragment>
    )
  }
}
Dashboard.contextType = UserContext;
export default withRouter(withStyles(styles)(Dashboard));
