import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Tx from './cards/Tx';
import Topbar from './Topbar';
import UserContext from './common/UserContext';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

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
  
  handleData = (data)=>{
    this.setState({
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
    const {data} = this.state;
    const currentPath = this.props.location.pathname;
    let eventLink= './record';
    if(data.length>0){
      eventLink += '?subject=' + data[0].Value.arg_0;
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
              <Grid item xs={12}>
                <Link component={RouterLink} to={eventLink}>
                  Record New Event
                </Link>
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