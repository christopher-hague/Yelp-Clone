import React from 'react'

class UserLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      curUser: null,
      curUserId: null
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
    .then( res =>
      res.json()
    )
    .then(json => {
      if (json.error) {
        alert("user not found")
      } else {
        localStorage.setItem('token', json.token)
        localStorage.setItem("username", json.user.username)
        localStorage.setItem("user_id", json.user.user_id)
        this.setState({
          curUser: json.user.username,
          curUserId: json.user.user_id
        })
        this.props.handleLogin(this.state.curUser, this.state.curUserId)
      }
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
          <input className="username input" type="text" onChange={this.handleUsernameChange.bind(this)} placeholder="Enter username"/>

          <input className="password input" type ="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Enter password"/>

          <input type="submit" className="ui submit button" value="Login"/>
        </form>
      </div>
    )
  }
}

export default UserLogin
