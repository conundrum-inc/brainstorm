import React from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionsCreators';

import Graph from './Graph.jsx'
import NodeDetail from './NodeDetail.jsx';
import EditCommentDetail from './EditCommentDetail.jsx';

import { click, forceDiagram} from '../../d3/d3helpers.js'

import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

import io from "socket.io-client";
// var socket = io();



// const modalStyles = {
//   overlay : {
//     width: '200px'
//   }
// };


class Session extends React.Component {
  constructor(props){
    super(props);

    socket.on('update session', function(message, session) {
      if (session) {
        message += session
      }
      console.log('SERVER: ', message);
    })

    // socket.on('rooms', (data) => {
    //   console.log('joined room. Received rooms: ', data);
    // })

    socket.on('socket comment', (comments) => {
      console.log('comments from socket', comments)
      props.updateComments(comments);
    })
    // socket.on('upvoted comment', (data) => {
    //   console.log('upvoted comment from socket', data)
    //   props.editComment(data);
    // })
    // socket.on('downvoted comment', (data) => {
    //   console.log('downvoted comment from socket', data)
    //   props.editComment(data);
    // })
    // socket.on('update comment', (data) => {
    //   console.log('updated comment from socket', data)
    //   props.editComment(data);
    // })
  }

  componentDidUpdate() {
    
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
          <Button className="exit-btn" onClick={() => {this.props.hideDetail()}}>X</Button>

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
function mapStateToProps(state) {
  return {
    comments: state.comments,
    session: state.session,
    detailViewVisible: state.detailViewVisible,
    editCommentDetailVisible: state.editCommentDetailVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
