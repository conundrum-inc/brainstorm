import React from 'react';
import Menu from './Menu.jsx';
import NodeDetail from './NodeDetail.jsx';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

import { click, forceDiagram} from '../../d3/d3helpers.js'

import Graph from './Graph.jsx'

class Session extends React.Component {

  render() {
    return (
      <div>
        <ReactModal isOpen={this.props.detailViewVisible}
                    contentLabel="Detail Modal"
                    shouldCloseOnOverlayClick={this.props.detailViewVisible}
        >
          <Button bsStyle="danger" onClick={this.props.hideDetail}>X</Button>
          <NodeDetail addComment={this.props.addComment}
                      currentNode={this.props.currentNode}
                      setNode={this.props.setNode}
                      updateNode={this.props.updateNode}
                      user={this.props.user}
                      hideDetail={this.props.hideDetail}
                      thunkUpVote={this.props.thunkUpVote}
                      thunkDownVote={this.props.thunkDownVote}
                      downvote={this.props.downvote}
          />
        </ReactModal>
        <Graph comments={this.props.comments}
               setNode={this.props.setNode}
               showDetail={this.props.showDetail}
        />

      </div>
    )
  }
}
export default Session;
