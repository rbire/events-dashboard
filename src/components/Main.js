import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InstructionDialog from './dialogs/InstructionDialog';
import SwipeDialog from './dialogs/SwipeDialog';
import Topbar from './Topbar';

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
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  },  
});

class Main extends Component {

  state = {
    learnMoredialog: false,
    getStartedDialog: false
  };

  componentDidMount() {}

  openDialog = (event) => {
    this.setState({learnMoredialog: true});
  }

  dialogClose = (event) => {
    this.setState({learnMoredialog: false});
  }

  openGetStartedDialog = (event) => {
    this.setState({getStartedDialog: true});
  }

  closeGetStartedDialog = (event) => {
    this.setState({getStartedDialog: false});
  }

  goToPage = (page, queryString) => {
    this.props.history.push({
      pathname: '/' + page,
      search: queryString
    })
  }
  goToDashboard = event => {
    this.goToPage('dashboard');
  }
  goToLedger = event => {
    this.goToPage('ledger','subject=US-34712-49927-100632-R-N');
  }  

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      The Standard
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Submitted to RESO Distributed Ledger Workgroup by the Real Estate Blockchain Initiative
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                     The Model
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    An application communication standard, independent of the underlying systems, ideal for integrating traditional systems with distributed ledgers in a (B2B) arrangement
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      Usage
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    A communications format, independent on systems that create or consume events.
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div>
                        <div>
                          <Typography color='secondary' gutterBottom>
                            Events
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                          Events are created by Event Producers and be either traditional systems or distributed ledgers. After the event is created, it is formatted into the RESO Event Model format and transmitted to other applications. Applications that consumer RESO Event Model formatted events are called Event Consumers. An Event Consumer can be a web application, mobile app, traditional system, or a distributed ledger.
                          </Typography>
                        </div>
                        <div className={classes.alignRight}>
                            <Button onClick={this.openGetStartedDialog}  variant="outlined" className={classes.actionButtom}>
                              Learn more
                            </Button>
                            <Button onClick={this.goToDashboard} color='primary' variant="contained" className={classes.actionButtom}>
                              Dashboard
                            </Button>
                            <Button color='primary' variant="contained" className={classes.actionButtom} onClick={this.goToLedger}>
                              Ledger
                            </Button>
                        </div>
                      </div>
                    </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <SwipeDialog
            open={this.state.learnMoredialog}
            onClose={this.dialogClose} />
          <InstructionDialog
            open={this.state.getStartedDialog}
            onClose={this.closeGetStartedDialog}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));
