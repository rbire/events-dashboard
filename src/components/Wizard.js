import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Back from './common/Back'
import {Events, Entities, EntityEvents} from './common/Lookups';
import UserContext from './common/UserContext';

const qs = require('query-string');
const backgroundShape = require('../images/shape.svg');

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  borderColumn: {
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    paddingBottom: 24,
    marginBottom: 24
  },
  flexBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  }
})

const getSteps = () => {
  return [
    'Event Record',
    'Confirmation',
    'Done'
  ];
}
const events = Object.keys(Events);
const entities = Object.keys(Entities)
class Wizard extends Component {
  state = {
    loading:false,
    tx_id:'waiting for confirmation.....',
    activeStep: 0,
    labelWidth: 0,
    subject:'',
    subjectType:'Agent',
    eventItem:events[0],
    actionItem:Events[events[0]][0]
  }
  componentWillMount(){
    const queryString = this.props.location.search
    const parse = queryString ? qs.parse(queryString):{}
    this.state.subject = parse.subject? parse.subject : 
    'US-043-04-' + Math.floor(Math.random()*500000)
  }
  componentDidMount() {

  }
  handleNext = () => {
    if(this.state.activeStep==0){
      this.context.events.ledger.recordEvents({
        'arg_0':this.state.subject,
        'arg_1':this.context.system,
        'arg_2':this.state.subjectType,
        'arg_3':this.context.entity,
        'arg_4':this.state.eventItem,
        'arg_5':this.state.actionItem,
        'arg_6':new Date(),
        'arg_7':'TestNet',
        'arg_8':'1.0',
        'arg_9':this.context.recorder
        }, this.handleConfirmation);
    }
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      loading:true,
    }));
  };

  handleConfirmation = (id)=>{
    this.setState(state=>({
      tx_id: id,
      activeStep: state.activeStep + 1,
      loading:false,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  stepActions() {
    if(this.state.activeStep === 1) {
      return 'Waiting';
    }
    if(this.state.activeStep === 2) {
      return 'Done';
    }
    return 'Next';
  }

  goToPage = (page, queryString) => {
    this.props.history.push({
      pathname: '/' + page,
      search: queryString
    })
  }

  goToDashboard = event => {
    this.goToPage('dashboard',this.props.location.search);
  }
  goToLedger = event => {
    this.goToPage('ledger','subject='+this.state.subject);
  }

  render() {
    const { classes } = this.props;
    const queryString = this.props.location.search
    const parse = queryString ? qs.parse(queryString):{}
    const subject = parse.subject? parse.subject : this.state.subject
    const entity=this.context.entity;
    const steps = getSteps();
    const { activeStep } = this.state;
    let event_items = '';
    if(entity!='anonymous'){
      event_items = EntityEvents[entity].map((v,i)=>{
        return <MenuItem value={v}>{v}</MenuItem>
      });
    }
    let action_items = Events[this.state.eventItem].map((v,i)=>{
      return <MenuItem value={v}>{v}</MenuItem>
    })
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <Back />
                <div className={classes.stepContainer}>
                  <div className={classes.bigContainer}>
                    <Stepper classes={{root: classes.stepper}} activeStep={activeStep} alternativeLabel>
                      {steps.map(label => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  { activeStep === 0 && (
                  <div className={classes.bigContainer}>
                    <Paper className={classes.paper}>
                      <div className={classes.topInfo}>
                        <div>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Information
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Recording Entity and Event Subject
                          </Typography>
                        </div>
                      </div>
                      <Grid item container xs={12}>
                        <Grid item xs={6}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Entity
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {entity=='anonymous'?this.goToPage('entity',this.props.location.search):entity}
                           </Typography>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Recorder
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {this.context.recorder}
                           </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Subject Type
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {this.state.subjectType} 
                          </Typography>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Subject
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {subject}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Event
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                              <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                  value={this.state.eventItem}
                                  onChange={this.handleChange}
                                  input={
                                    <OutlinedInput
                                      labelWidth={this.state.labelWidth}
                                      name="eventItem"
                                    />
                                  }
                                >
                                  <MenuItem value="">
                                    <em></em>
                                  </MenuItem>
                                  {event_items}
                                </Select>
                              </FormControl>
                          </Typography>
                          </Grid>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Action
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                              value={this.state.actionItem}
                              onChange={this.handleChange}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="actionItem"
                                />
                              }
                            >
                              <MenuItem value="">
                                <em></em>
                              </MenuItem>
                              {action_items}
                            </Select>
                          </FormControl>
                          </Typography>
                        </Grid>


                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { (activeStep === 1) && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Waiting for confirmation:
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {this.context.entity} {this.context.recorder} submitted {this.state.eventItem} {this.state.actionItem} event for {this.state.subjectType} {this.state.subject}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                          <div>
                            <Fade
                              in={this.state.loading}
                              style={{
                                transitionDelay: this.state.loading ? '800ms' : '0ms',
                              }}
                              unmountOnExit
                            >
                              <CircularProgress style={{marginBottom: 32, width: 100, height: 100}} />
                            </Fade>
                          </div>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}

                  { (activeStep === 2) && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Success <span role="img" aria-label="conrats emoji">🎉</span>
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Transaction Id:
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {this.state.tx_id}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}                  
                  <div className={classes.flexBar}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep < 1 ? this.handleNext : this.goToLedger}
                      size='large'
                    >
                      {this.stepActions()}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}
Wizard.contextType = UserContext;
export default withRouter(withStyles(styles)(Wizard));
