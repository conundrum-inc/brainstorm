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
       <div className="menu-bar">
         <h1 id="title"><a id="title" href='/main'>brainstorm</a></h1>
       </div>
       <div className="welcome-box">
         <h2 id="welcome">Welcome to Brainstorm!</h2>
         <p className="intro">Brainstorm is a collaborative coworking tool designed to let teams develop ideas in a visually iterative process. Get started by sigining in with you Google email, and invite friends to your brainstorming sessions by adding their email address to the session.</p>
         <a href="/auth/google"> <p className="google-auth-picture"><img src="http://i.imgur.com/xrh3oEi.png" /></p></a>
       </div>
     </div>
    )
  }
}

export default Login;
