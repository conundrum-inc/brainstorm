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
    console.log('props test', this.props)
  }

  render() {
    return (
      <div>
        <h1>BrainStorm</h1>
        <Menu />
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
                 updateNode={this.props.updateNode}
                 showMenu={this.props.showMenu}
                 hideMenu={this.props.hideMenu}
                 menuVisible={this.props.menuVisible}
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
