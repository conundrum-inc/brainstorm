import React from 'react';
import Menu from './Menu.jsx';
import NodeDetail from './NodeDetail.jsx';
import EditCommentDetail from './EditCommentDetail.jsx';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import io from "socket.io-client";
var socket = io();

import { click, forceDiagram} from '../../d3/d3helpers.js'

import Graph from './Graph.jsx'

// const modalStyles = {
//   overlay : {
//     width: '200px'
//   }
// };


class Session extends React.Component {
  constructor(props){
    super(props);


    socket.on('socket comment', (data) => {
      console.log('data from socket', data)
      props.updateComments(data);
    })
    socket.on('upvoted comment', (data) => {
      console.log('upvoted comment from socket', data)
      props.editComment(data);
    })
    socket.on('downvoted comment', (data) => {
      console.log('downvoted comment from socket', data)
      props.editComment(data);

    })
  }


  render() {
    return (
      <div id="session">

        <ReactModal isOpen={this.props.detailViewVisible}
                    contentLabel="Detail Modal"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => this.props.hideDetail()}
                    className="ReactModal__Content--after-open--new-comment"
        >
          <Button className="exit-btn" onClick={this.props.hideDetail}>X</Button>

          <NodeDetail />
        </ReactModal>

        <ReactModal isOpen={this.props.editCommentDetailVisible}
                    contentLabel="Edit Comment Detail Modal"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => this.props.hideEditCommentDetail()}
                    className="ReactModal__Content--after-open--edit-comment"
        >
          <Button className="exit-btn" onClick={this.props.hideEditCommentDetail}>X</Button>

          <EditCommentDetail/>
        </ReactModal>

        <Graph comments={this.props.comments}
               setNode={this.props.setNode}
               showDetail={this.props.showDetail}
               showCreateSession={this.props.showCreateSession}
        />

      </div>
    )
  }
}
export default Session;
