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
        <form onSubmit={this.handleUserAuthentication.bind(this)}>
          Username
          <input type="text" onChange={this.handleUsernameChange.bind(this)} />
          Password
          <input type ="password" onChange={this.handlePasswordChange.bind(this)} />
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default UserLogin
