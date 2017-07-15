import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionsCreators';

import Main from '../Main.jsx';

const MainPage = (props) => {
  // props.thunkAddComment('123', '456', '789', 'title', 'this is text');
  return (
    <div>
      <Main history={props.history}
            addComment={props.thunkAddComment}
            addNode={props.addNode}
            addLink={props.addLink}
            currentNode={props.currentNode}
            setNode={props.setNode}
            showDetail={props.showDetail}
            hideDetail={props.hideDetail}
            detailViewVisible={props.detailViewVisible}
            comments={props.comments}
            nodes={props.nodes}
            links={props.links}
            thunkAddUser={props.thunkAddUser}
          />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    detailViewVisible: state.detailViewVisible,
    nodes: state.nodes,
    links: state.links,
    currentNode: state.currentNode
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

MainPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage));
