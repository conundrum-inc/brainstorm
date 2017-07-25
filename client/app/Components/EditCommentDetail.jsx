import React from 'react';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';

class EditCommentDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e, props) {
    e.preventDefault();
    console.log('in EditCommentDetail details: ', this.props.currentNode._id, e.target.title.value, e.target.text.value)
    // this.props.thunkAddComment(this.props.currentNode._id, e.target.title.value, e.target.text.value);
    // this.props.hideDetail();
  }

  render() {
    return (
      <div className="new-comment-modal-content">
        <h4 className="node-title">Idea: "{this.props.currentNode.title}"</h4>
        <div className="buffer"></div>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup controlId="commentTitle" >
            <Col sm={10}>
              <FormControl className="node-detail-form" autoFocus="autofocus" type="title" name="title" placeholder={this.props.currentNode.title} maxLength="15"/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col sm={10}>
              <FormControl className="node-detail-form edit-node-form" type="details" name="text" placeholder={this.props.currentNode.text} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={10}>
              <Button className="submit-btn" type="submit">Edit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
export default EditCommentDetail;
