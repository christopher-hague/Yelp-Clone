import React from 'react'
import UserSignup from './UserSignup'
import UserLogin from './UserLogin'

class Welcome extends React.Component {
  constructor() {
    super()

    this.state = {
      showSignup: false
    }
  }

  handleFormShow(event) {
    this.setState({
      showSignup: this.state.showSignup ? false : true
    })
  }


  render() {
    return (
      <div>
        {this.state.showSignup ? <UserSignup swapForm={this.handleFormShow.bind(this)} /> : <UserLogin swapForm={this.handleFormShow.bind(this)} />}
      </div>
    )
  }
}

export default Welcome
