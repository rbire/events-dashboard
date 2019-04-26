import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';

const styles = theme => ({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2
  }
});

class InstructionDialog extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BaseDialog {...this.props} >
        <div className={classes.bottomMargin}>
          <Typography variant="body2" gutterBottom>Event Catalog</Typography>
 <p>An event is a record of occurrence that reflects the state of a document,
process, system,  or object as of a point in time.  Events expressed with a
standard approach are easier to store and pass between systems.  The RESO
Distributed Ledger Event Model represents a standard approach that can be used
to reliably record, playback, and communicate events.</p>
<p>The Event Model is an application communication standard that is independent of
the underlying systems on each side.  It is ideal for integrating traditional
systems with distributed ledgers in a business-to-business (B2B) arrangement.
The model can also be used to connect websites with distributed ledgers in a
business-to-consumer (B2C) scenario.</p>
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="left">Responsibility</th>
<th align="left">Scope</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">TransactionId</td>
<td align="left">System Assigned</td>
<td align="left">Unique within the ledger</td>
<td align="left">A unique identifier created for each recording in an immutable ledger</td>
</tr>
<tr>
<td align="left">EventSubject</td>
<td align="left">Application Supplied</td>
<td align="left">Opaque to the ledger</td>
<td align="left">Uniquely identifies the object of the event. e.g. Unique Property Identifier, Unique Agent Identifier, Unique Organization Identifier, etc.</td>
</tr>
<tr>
<td align="left">System</td>
<td align="left">Lookup</td>
<td align="left">System Value</td>
<td align="left">Classification of the business system generating the event. The type of user is handled by the Entity lookup.</td>
</tr>
<tr>
<td align="left">SubjectType</td>
<td align="left">Lookup</td>
<td align="left">SubjectType Value</td>
<td align="left">Classification of the object the event is being applied to; the noun.  Related to the EventSubject.</td>
</tr>
<tr>
<td align="left">Entity</td>
<td align="left">Lookup</td>
<td align="left">Entity Value</td>
<td align="left">Classification of the what generated the event; the actor.   A person uses a System to record events.</td>
</tr>
<tr>
<td align="left">Event</td>
<td align="left">Lookup</td>
<td align="left">Event Value</td>
<td align="left">Describes a document, occurrence , or incident.  Typically has associated documentation. Further classified by State.</td>
</tr>
<tr>
<td align="left">State</td>
<td align="left">Lookup</td>
<td align="left">State Value</td>
<td align="left">A verb identifying the occurrence being recorded.  Expressed in terms of the Event argument.</td>
</tr>
<tr>
<td align="left">Recorder</td>
<td align="left">Application Supplied</td>
<td align="left">Opaque to the ledger</td>
<td align="left">An identifier of the entity who is responsible for creating the event.</td>
</tr>
<tr>
<td align="left">Timestamp</td>
<td align="left">System Assigned</td>
<td align="left">UTC timestamp</td>
<td align="left">The underlying distributed ledger assigns this field.</td>
</tr>
<tr>
<td align="left">Version</td>
<td align="left">System Assigned</td>
<td align="left">Version of this standard</td>
<td align="left">The underlying distributed ledger assigns this field</td>
</tr>
<tr>
<td align="left">Application</td>
<td align="left">Application Supplied</td>
<td align="left">Opaque to the ledger</td>
<td align="left">Identifies the application or system used to record the event; the system of record.</td>
</tr>
</tbody>
</table>          
        </div>
      </BaseDialog>
    )
  }
}

export default withRouter(withStyles(styles)(InstructionDialog));
