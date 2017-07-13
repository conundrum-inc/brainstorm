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
            showMenu={props.showMenu}
            hideMenu={props.hideMenu}
            menuVisible={props.menuVisible}
          />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    detailViewVisible: state.detailViewVisible,
    menuVisible: state.menuVisible
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
