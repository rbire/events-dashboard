import React,  { Component } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Back from './common/Back';
import {Entities} from './common/Lookups';
import UserContext from './common/UserContext';

const backgroundShape = require('../images/shape.svg');

const numeral = require('numeral');
numeral.defaultFormat('0');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
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
  logo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
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
  }
})

const getSteps = () => {
  return [
    'Recorder',
    'Confirm'
  ];
}
const entities = Object.keys(Entities)

class Signup extends Component {
  state = {
    activeStep: 0,
    entity:entities[0],
    recorder: Entities[entities[0]][0],
    termsChecked: false,
    loading: true,
    labelWidth: 0
  }

  componentDidMount() {

  }

  componentWillMount(){
    const entity = this.context.entity;
    if(entity!='anonymous'){
      this.setState({
        entity:this.context.entity,
        recorder:this.context.recorder
      });
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    if(this.state.activeStep === 0) {
      setTimeout(() => this.props.history.push('/'), 2000)
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  stepActions() {
    if(this.state.activeStep === 0) {
      return 'Sign in';
    }
    if(this.state.activeStep === 1) {
      return 'Confirm';
    }
    return 'Next';
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, loading } = this.state;
    let entity_items = entities.map((v,i)=>{
      return <MenuItem value={v}>{v}</MenuItem>
    })
    let recorder_items = Entities[this.state.entity].map((v,i)=>{
      return <MenuItem value={v}>{v}</MenuItem>
    })

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Back />
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.stepContainer}>
                  <div className={classes.stepGrid}>
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
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Select
                          </Typography>
                          <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                            Recording Entity
                          </Typography>
                        </div>
                        <div>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                              value={this.state.entity}
                              onChange={this.handleChange}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="entity"
                                />
                              }
                            >
                              <MenuItem value="">
                                <em>Recorder</em>
                              </MenuItem>
                              {entity_items}
                            </Select>
                                
                            <Select
                              value={this.state.recorder}
                              onChange={this.handleChange}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="recorder"
                                />
                              }
                            >
                              <MenuItem value="">
                                <em>Entity</em>
                              </MenuItem>
                              {recorder_items}
                            </Select>
                          </FormControl>

                      </div>
                      </div>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 1 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Confirmation
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            All your transactions will be recorded under the following identity:
                          </Typography>
                        </div>
                        <div>
                          <Typography color='secondary' gutterBottom>
                            Recorder
                          </Typography>
                          <List component="nav">
                            <ListItem>
                              <ListItemIcon>
                                <DoneIcon />
                              </ListItemIcon>
                              <ListItemText inset primary={this.state.entity} />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <DoneIcon />
                              </ListItemIcon>
                              <ListItemText inset primary={this.state.recorder} />
                            </ListItem>
                          </List>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: 380, textAlign: 'center'}}>
                          <div style={{marginBottom: 32}}>
                            <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>
                              Collecting your data
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              We are processing your request
                            </Typography>
                          </div>
                          <UserContext.Consumer>
                              {({handleChange}) => ( 
                                <span>{handleChange(this.state)}</span>    
                              )}
                          </UserContext.Consumer>
                          <div>
                            <Fade
                              in={loading}
                              style={{
                                transitionDelay: loading ? '800ms' : '0ms',
                              }}
                              unmountOnExit
                            >
                              <CircularProgress style={{marginBottom: 32, width: 100, height: 100}} />
                            </Fade>
                          </div>
                        </div>
                      </div>
                      </div>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 0 && (
                     <div className={classes.buttonBar}>
                     <Button
                       variant="contained"
                       color="primary"
                       onClick={this.handleNext}
                       size='large'
                       style={this.state.recorder.length ? {background: classes.button, color: 'white'} : {}}
                       disabled={!this.state.recorder.length}
                     >
                       {this.stepActions()}
                     </Button>
                   </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}
Signup.contextType = UserContext;
export default withRouter(withStyles(styles)(Signup))
