import React, { Component } from 'react'
import SimpleLineChart from './SimpleLineChart';
import UserContext from './UserContext';
class Ecm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data:[]
    }
  }
  handleEvent(){
    this.setState({data:this.context.events.counts});
  }
  componentWillMount(){
    this.setState({data:this.context.events.counts});
    this.context.registerCallback(this.handleEvent.bind(this));
  }                  
  render() {
    return (
      <SimpleLineChart data={this.state.data} />
    )
  }
}
Ecm.contextType = UserContext;
export default Ecm