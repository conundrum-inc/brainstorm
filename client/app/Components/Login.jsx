import React from 'react';


const Login = (props) => {
  return (
    <div>
      <h2>Welcome to Brainstorm!</h2>
      <div>Sign in with Google to get started.</div>
      <button className="btn google-oauth"> Sign In</button>
    </div>
  )
}

export default Login;
