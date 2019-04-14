import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CardItem from './cards/CardItem';
import Topbar from './Topbar';
import UserContext from './common/UserContext';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['A500'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: 1000
  }
})

class Events extends Component {
  constructor(props) {
    super(props)
    this.trigger = null;
    this.state = {
        data:[],
        startAt:'',
        showOnly:''
    }
  }

  handleChange = prop => event => {
    this.context.events[prop] = event.target.value;

    clearTimeout(this.trigger);
    this.trigger = setTimeout(function() { 
      this.context.startMonitor();
    }.bind(this), 3000);
  };

  handleEvent(){
    this.setState({
        data:this.context.events.data
        });
  }
  componentWillMount(){
    this.setState({
      data:this.context.events.data
    });
    this.context.registerCallback(this.handleEvent.bind(this));
  }                  

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    const {startAt, showOnly} = this.state;
    var cards = this.state.data.map((tx)=>{
      return <CardItem key={tx.block} tx={tx}/>
    })
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
              <TextField
                label="Starting Block"
                id="start"
                onChange={this.handleChange('startAt')}
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Block#</InputAdornment>,
                }}
              />
              <TextField
                label="Show Only"
                id="show"
                onChange={this.handleChange('showOnly')}
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Filter</InputAdornment>,
                }}
              />
                {cards.reverse()}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

Events.contextType = UserContext;
export default withStyles(styles)(Events);