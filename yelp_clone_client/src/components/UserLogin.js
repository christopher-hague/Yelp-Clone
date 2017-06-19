import React from 'react'

class UserLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  handleUserAuthentication(event) {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/auth", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
    .then( res => res.json() )
    .then(json => {
      // username and user_id are being stored in sessionStorage, which they shouldn't be
      // store these values in a parent component instead
      // instead of setting name/id values, write a function that will update the state of username/id in the higher component
      sessionStorage.setItem('token', json.token)
      sessionStorage.setItem('username', json.user.username)
      sessionStorage.setItem('user_id', json.user.user_id)
      this.props.handleLogin()
    })
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form className="ui icon input" onSubmit={this.handleUserAuthentication.bind(this)}>
          <input className="username input" type="text" onChange={this.handleUsernameChange.bind(this)} placeholder="Enter username"
          />

          <input className="password input" type ="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Enter password"
          />

          <input type="submit" className="ui submit button" value="Login"/>
        </form>
      </div>
    )
  }
}

export default UserLogin





//########          FANCY FORM
// <div className="ui two column middle aligned very relaxed stackable grid">
//   <div className="column">
//     <div className="ui form">
//
//       <div className="field">
//         <label>Username</label>
//         <div className="ui left icon input">
//           <input type="text" placeholder="Username"/>
//           <i className="user icon"></i>
//         </div>
//       </div>
//
//       <div className="field">
//         <label>Password</label>
//         <div className="ui left icon input">
//           <input type="password" />
//           <i className="lock icon"></i>
//         </div>
//       </div>
//
//       <div className="ui blue submit button" onClick={this.handleUserAuthentication.bind(this)}>Login</div>
//     </div>
//   </div>
//
//   <div className="ui vertical divider">
//   </div>
//
//   <div className="center aligned column" onClick={this.props.swapForm}>
//     <div className="ui big green labeled icon button">
//       <i className="signup icon"></i>
//       Sign Up
//     </div>
//   </div>
//
// </div>
