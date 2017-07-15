import React from 'react';
import Session from './Session.jsx';
import Menu from './Menu.jsx';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.thunkAddUser();
  }

  render() {
    return (
      <div>
        <h2>BrainStorm</h2>
        <Menu />
        <Button className="add-comment" bsStyle="info" onClick={() => this.props.addComment('123', '345', '678', 'first comment', 'yassssss')}>New Idea</Button>
        <Session showDetail={this.props.showDetail}
                 hideDetail={this.props.hideDetail}
                 detailViewVisible={this.props.detailViewVisible}
                 comments={this.props.comments}
                 nodes={this.props.nodes}
                 links={this.props.links}
                 currentNode={this.props.currentNode}
                 addNode={this.props.addNode}
                 addLink={this.props.addLink}
                 setNode={this.props.setNode}
        />
      </div>
    )
  }

}

export default Main;

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
