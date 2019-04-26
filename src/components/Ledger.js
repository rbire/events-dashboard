import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AddBox from '@material-ui/icons/AddBox';
import classNames from 'classnames';

import Tx from './cards/Tx';
import Topbar from './Topbar';
import UserContext from './common/UserContext';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const qs = require('query-string');

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

class Ledger extends Component {
  constructor(props) {
    super(props)
    this.state = {
        subject:'',
        data:[],
        loading:true
    }
  }

  handleChange = event => {
    let subject = event.target.value;
    clearTimeout(this.trigger);
    this.trigger = setTimeout(function() {
      this.props.history.push({
        pathname: '/ledger',
        search: 'subject=' + subject
      });
      this.context.events.ledger.queryEventHistory(subject, this.handleData);        
    }.bind(this), 2000);
  };

  handleData = (data)=>{
    const subject = data.length>0?data[0].Value.arg_0:'';
    this.setState({
      subject:subject,
      data: data,
      loading:false,
    });
  };

  componentWillMount(){
    const queryString = this.props.location.search
    const parse = queryString ? qs.parse(queryString):{}
    const subject = parse.subject? parse.subject : ''
    this.context.events.ledger.queryEventHistory(subject, this.handleData);
  }                  

  render() {
    const { classes } = this.props;
    const {data,subject} = this.state;
    const currentPath = this.props.location.pathname;
    let eventLink= './record';
    if(subject!=''){
      eventLink+='?subject=' + subject
    }
    var cards = data.map((tx)=>{
      return <Tx key={tx.TxId} tx={tx.Value}/>
    })
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12} md={6}>
                  <TextField
                    label={subject}
                    id="upid"
                    defaultValue={subject}
                    onChange={this.handleChange} fullWidth={true}
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Find#</InputAdornment>,
                    }}
                  />
               </Grid> 
               <Grid item xs={12} md={6}>  
                      <Link component={RouterLink} to={eventLink}>
                          <AddBox /><span>Record New Event</span>
                       </Link>
              </Grid>
              <Grid item xs={12}>
                {cards.reverse()}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

Ledger.contextType = UserContext;
export default withStyles(styles)(Ledger);