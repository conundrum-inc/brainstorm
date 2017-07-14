import React from 'react';
import { logout } from '../axiosCalls'


class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    logout();
    this.props.removeUser();
  }
  render() {
   return (
     <div>
     <h2>Welcome to Brainstorm!</h2>
     <a href="/auth/google">Sign In with Google</a>
     </div>
    )
  }
}


export default Login;
