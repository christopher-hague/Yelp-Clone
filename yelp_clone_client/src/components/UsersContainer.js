import React from 'react'

class UsersContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: props,
      usernameInput: '',
      userPassword: ''
    }
  }

  handleUsernameChange(event) {
    this.setState({
      usernameInput: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
      userPassword: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify( { user: { username: this.state.usernameInput, password: this.state.userPassword } } )
    })
    .then( res => res.json() )

    this.setState({
      usernameInput: '',
      userPassword: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Username:
            <input type="text" value={this.state.usernameInput} onChange={this.handleUsernameChange.bind(this)} />
            Password:
            <input type="password" value={this.state.userPassword} onChange={this.handlePasswordChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div>
          {this.state.users.username}
        </div>
      </div>
    )
  }
}

export default UsersContainer
