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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Back from './common/Back'
import {Events, Entities} from './common/Lookups';

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
    'Recorder',
    'Resource',
    'Transactions',
    'Done'
  ];
}
const events = Object.keys(Events);
const entities = Object.keys(Entities)
class Wizard extends Component {

  state = {
    activeStep: 0,
    labelWidth: 0,
    entity:entities[0],
    recorder:Entities[entities[0]][0],
    subject:'US-42049-49888-1213666-R-N',
    subjectType:'Property',
    eventItem:events[0],
    actionItem:Events[events[0]][0]
  }

  componentDidMount() {

  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
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
    if(this.state.activeStep === 3) {
      return 'Accept';
    }
    if(this.state.activeStep === 4) {
      return 'Send';
    }
    if(this.state.activeStep === 3) {
      return 'Done';
    }
    return 'Next';
  }

  goToDashboard = event => {
    const queryString = this.props.location.search

    this.props.history.push({
      pathname: '/dashboard',
      search: queryString
    })
  }

  render() {

    const { classes } = this.props;
    const queryString = this.props.location.search
    const parsed = queryString ? qs.parse(queryString) : {}
    const steps = getSteps();
    const { activeStep } = this.state;
    let event_items = events.map((v,i)=>{
      return <MenuItem value={v}>{v}</MenuItem>
    })
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
                            General information about the service
                          </Typography>
                        </div>
                        <div>
                        <Button variant="outlined" size="large" className={classes.outlinedButtom}>
                          Edit
                        </Button>
                        </div>
                      </div>
                      <Grid item container xs={12}>
                        <Grid item xs={6}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Entity
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {this.state.entity}
                           </Typography>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Recorder
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {this.state.recorder}
                           </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Subject
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {this.state.subjectType} 
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {this.state.subject}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 1 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Event information
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Select an Event Type
                          </Typography>
                        </div>
                        <div>
                          <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                            Event
                          </Typography>
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
                        </div>
                      </div>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 2 && (
                  <div className={classes.bigContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12} style={{marginTop: 24}}>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                            Actions
                          </Typography>
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
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { (activeStep === 3 || activeStep === 4) && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Congratulations <span role="img" aria-label="conrats emoji">🎉</span>
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {this.state.entity} {this.state.recorder} successfully submitted {this.state.eventItem} {this.state.actionItem} event for {this.state.subjectType} {this.state.subject}
                          </Typography>
                          <Button fullWidth variant='outlined'>
                            Checkout the Dashboard
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  <div className={classes.flexBar}>
                    { activeStep !== 5 && (
                      <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                      size='large'
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep !== 5 ? this.handleNext : this.goToDashboard}
                      size='large'
                      disabled={this.state.activeStep === 3 && !this.state.termsChecked}
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
export default withRouter(withStyles(styles)(Wizard));
