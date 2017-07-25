import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionsCreators';
import Login from '../Login.jsx';

const LoginPage = (props) => {
  return (
    <div id="login-container">
      <Login history={props.history} removeUser={props.removeUser}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    detailViewVisible: state.detailViewVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


LoginPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage));
