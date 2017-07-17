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
    <h1><a href='/login'>Welcome to BrainStorm!</a></h1>
     <a href="/auth/google">Sign In with Google</a>
     </div>
    )
  }
}


export default Login;
