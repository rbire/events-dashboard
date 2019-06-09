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


var map = {
  'Person':   <PersonIcon />,
  'Application':  <DescriptionIcon />,
  'Personal' : <PersonIcon/>,
  'License1':   <ChromeReaderMode />,
  'License2':   <ChromeReaderMode />,
  'Financial':  <AccountBalance />,
  'Experience':<InboxIcon/>,
  'ICA':<AssignmentIcon/>,
  'Email':<DraftsIcon/>,
  'Firm' : <VerifiedUser/>,
}
function EventIcon(props) {
    var icon = map[props.name]
    if(icon==undefined)
      icon = <ContactSupport/>
    return (
      <span>
      {icon}
      </span>
    )
}
export default EventIcon
