import React from 'react';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';

class NodeDetail extends React.Component {

  onSubmit(e, props) {
    e.preventDefault();
    this.props.clearComments();
    this.props.thunkCreateSession(e.target.title.value, e.target.text.value, this.props.user.userId);
    this.props.hideCreateSession();
  }

  render() {
    return (
      <div>
        <h2>Start a Sesh</h2>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup controlId="commentTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Session Title:
            </Col>
            <Col sm={10}>
              <FormControl name="title" type="title" placeholder="What are you brainstorming for?" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Description:
            </Col>
            <Col sm={10}>
              <FormControl name="text" type="details" placeholder="This is your brainstorm starting point! Details, criteria, suggestions go here for collaborators to check out. " />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
export default NodeDetail;
