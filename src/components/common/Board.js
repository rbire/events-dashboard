import React, {Component} from 'react'
import {Board} from 'react-trello'
import UserContext from './UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import LaneCard from '../cards/LaneCard'
const styles = theme => ({
    itemContainer: {
      transition: 'width 100ms ease-in-out'
    },
})
var lanesData=[];
var lanes={};
var cards={}
var bus = null;
class EventBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }    

    setEventBus = eventBus => {
        bus = eventBus
        this.context.registerTxCallback(this.handleEvent.bind(this));       
    }

    handleEvent(tx){
        tx.id=tx.transaction.Subject;
        var lane = tx.transaction.Event;
        if(lanes[e]==undefined)
        {
            lanes[lane]=true
            lanesData.push({
                "id": lane,
                "title": lane,
                "style": {"width": 280},
                "cards": []
            })
            bus.publish({type: 'UPDATE_LANES', lanes: [...lanesData]})
        }
        if(cards[tx.id]==undefined){
            bus.publish( {
                type: 'ADD_CARD',
                laneId: lane,
                card: tx
            })
        }else{
            bus.publish({type: 'MOVE_CARD', fromLaneId: cards[tx.id], toLaneId: lane, cardId: tx.id, index: 0})
        }
        cards[tx.id]=lane
    }

    render() {
        return (
            <Board customCardLayout
                data={{lanes:[]}}
                eventBusHandle={this.setEventBus}>
                <LaneCard/>
            </Board>
            
        )
    }
}
EventBoard.contextType = UserContext;
export default withStyles(styles)(EventBoard)