import React, { Component } from 'react'
import SimpleLineChart from './SimpleLineChart';
import UserContext from './UserContext';
class Ecm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        events:[],
        recorders:[]
    }
  }
  handleEvent(){
    this.setState({events:this.context.events.event_counts});
    this.setState({recorders:this.context.events.recorder_counts});
  }
  componentWillMount(){
    this.setState({events:this.context.events.event_counts});
    this.setState({recorders:this.context.events.recorder_counts});
    this.context.registerCallback(this.handleEvent.bind(this));
  }                  
  render() {
    return (
      <div>
      <SimpleLineChart data={this.state.events} />
      <SimpleLineChart data={this.state.recorders} />
      </div>
    )
  }
}
Ecm.contextType = UserContext;
export default Ecm