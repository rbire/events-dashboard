import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CardItem from './CardItem';
import UserContext from '../common/UserContext';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
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

class RecentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        tx:{}
    }
  }
  handleEvent(tx){
    this.setState({tx:this.context.events.tx});
  }
  componentWillMount(){
    this.setState({tx:this.context.events.tx});
    this.context.registerCallback(this.handleEvent.bind(this));
  }                  

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <CardItem tx={this.state.tx}/>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

RecentCard.contextType = UserContext;
export default withStyles(styles)(RecentCard);