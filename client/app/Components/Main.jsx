import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import Menu from './Menu.jsx';
import Session from './Session.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.thunkAddUser();
  }

  componentDidMount() {
    console.log('props test in Main: ', this.props)
  }

  render() {
    return (
      <div>
        <h1><a href='/main'>BrainStorm</a></h1>
        <Menu    showCreateSession={this.props.showCreateSession}
                 hideCreateSession={this.props.hideCreateSession}
                 createSessionVisible={this.props.createSessionVisible}
                 currentNode={this.props.currentNode}
                 setNode={this.props.setNode}
                 updateNode={this.props.updateNode}
                 addComment={this.props.addComment}
        />
        <Session showDetail={this.props.showDetail}
                 hideDetail={this.props.hideDetail}
                 detailViewVisible={this.props.detailViewVisible}
                 comments={this.props.comments}
                 nodes={this.props.nodes}
                 links={this.props.links}
                 addNode={this.props.addNode}
                 addLink={this.props.addLink}
                 detailViewVisible={this.props.detailViewVisible}
                 user={this.props.user}
                 setNode={this.props.setNode}
                 currentNode={this.props.currentNode}
        />
      </div>
    )
  }

}

export default connect()(Main);

// {/* <Menu className="menu-button" menuVisible={props.menuVisible} onClick={() => props.menuVisible ? props.hideMenu() : props.showMenu()}/> */}
//

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     logout();
//   }
//   render() {
//    return (
//      <div>
//      <h2>Welcome to Brainstorm!</h2>
//      <a href="/auth/google">Sign In with Google</a>
//      </div>
//     )
//   }
// }
