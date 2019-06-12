import React, { Component } from 'react';
import PageviewIcon from '@material-ui/icons/Pageview';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import AccountBalance from '@material-ui/icons/AccountBalance';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';
import ContactSupport from '@material-ui/icons/ContactSupport';
var small={
  fontSize:'12pt'
}

var mapSmall = {
  'Person':   <PersonIcon style={small}/>,
  'Application':  <DescriptionIcon  style={small}/>,
  'Personal' : <PersonIcon style={small}/>,
  'License1':   <ChromeReaderMode style={small}/>,
  'License2':   <ChromeReaderMode style={small}/>,
  'Financial':  <AccountBalance style={small}/>,
  'Experience':<InboxIcon style={small}/>,
  'ICA':<AssignmentIcon style={small}/>,
  'Email':<DraftsIcon style={small}/>,
  'Firm' : <VerifiedUser style={small}/>,
}
var mapNormal = {
  'Person':   <PersonIcon/>,
  'Application':  <DescriptionIcon />,
  'Personal' : <PersonIcon />,
  'License1':   <ChromeReaderMode />,
  'License2':   <ChromeReaderMode />,
  'Financial':  <AccountBalance />,
  'Experience':<InboxIcon/>,
  'ICA':<AssignmentIcon/>,
  'Email':<DraftsIcon/>,
  'Firm' : <VerifiedUser/>,
}

function EventIcon(props) {
    var icon = props.small?mapSmall[props.name]: mapNormal[props.name]
    if(icon==undefined)
      icon = <ContactSupport style={small}/>
    return (
      <span>
      {icon}
      </span>
    )
}
export default EventIcon
