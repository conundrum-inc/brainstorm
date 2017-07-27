import React from 'react';

import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';


const InviteDetail = (props) => {

  return (
    <div>
      <FormGroup className="form-horizontal form-group" controlId="inviteEmails">
        <Col sm={10}>
          <FormControl autoFocus="autofocus" name="emails" type="emails" placeholder="sam@gmail, pete@gmail, etc." />
        </Col>
      </FormGroup>

      <FormGroup className="form-horizontal form-group">
        <Col sm={10}>
          <Button className="submit-btn" type="submit">
            Submit
          </Button>
        </Col>
      </FormGroup>
    </div>
  )
}

export default InviteDetail
