import React, {Component} from 'react'
import {Board} from 'react-trello'
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import LaneCard from '../cards/LaneCard'
const data = require('./lanes.json')

const styles = theme => ({
    itemContainer: {
      transition: 'width 100ms ease-in-out'
    },
})

class EventBoard extends Component {
    constructor(props) {
        super(props)
    }    

    setEventBus = eventBus => {
        this.context.setEventBus(eventBus);
        this.setState({eventBus})
    }

    async componentWillMount() {
    }

    render() {
        return (
            <Board customCardLayout
                data={data}
                eventBusHandle={this.setEventBus}>
                <LaneCard/>
            </Board>
            
        )
    }
}
EventBoard.contextType = UserContext;
export default withStyles(styles)(EventBoard)