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
  }
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
  }
  handleChange = prop => event => {
    this.context.events[prop] = event.target.value;

    clearTimeout(this.trigger);
    this.trigger = setTimeout(function() {
      this.setState({
        loading:true
      });
      this.context.startMonitor();
    }.bind(this), 3000);
  };

  handleEvent(){
    this.setState({
        loading:false
    });
  }
  componentWillMount(){
    this.context.registerCallback(this.handleEvent.bind(this));
  }                  

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const currentPath = this.props.location.pathname;
    const {startAt, showOnly} = this.context.events;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
            <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                      Current Block Height : {this.context.events.blockHeight}
                  </Typography>
                  <TextField
                    label="Synchronize"
                    id="start"
                    defaultValue={startAt}
                    onChange={this.handleChange('startAt')}
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">From#</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Filter"
                    id="show"
                    defaultValue={showOnly}
                    onChange={this.handleChange('showOnly')}
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Keyword</InputAdornment>,
                    }}
                  />
              </Grid>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12} md={12} >
                    <Loading loading={loading} />
                    <div className={loading ? classes.loadingState : ''}>
                    </div>
                    <Paper className={classes.paper} style={{position: 'relative'}}>
                        <Ecm/>
                    </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}
Dashboard.contextType = UserContext;
export default withRouter(withStyles(styles)(Dashboard));
