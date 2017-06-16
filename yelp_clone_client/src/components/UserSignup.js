import React from 'react'

class UserSignup extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: ''
    }
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

  handleCreateUser(event) {
    event.preventDefault()
    if(!this.state.username || !this.state.password) {
      alert("You need a username and a password in order to sign up")
    } else {
      fetch("http://localhost:3000/api/v1/users", {
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
      .then(data => {
        this.setState({
          username: '',
          password: ''
        })
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form className="ui icon input" onSubmit={this.handleCreateUser.bind(this)}>
          <label>
            <input value={this.state.username} className="username input" onChange={this.handleUsernameChange.bind(this)} type="text" placeholder="Username..."/>
            <input value={this.state.password} className="password input" onChange={this.handlePasswordChange.bind(this)} type="password" placeholder="Password..."/>
            <input type="submit" className="ui submit button" value="Complete Signup"/>
          </label>
        </form>
      </div>
    )
  }
}

export default UserSignup

// handleSubmit(event) {
//   event.preventDefault()
//   if(this.state.reviewRating === null) {
//     alert("You must submit this review with a rating. Select a rating for this business in order to post your review.")
//   } else {
//     fetch("http://localhost:3000/api/v1/reviews", {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         review: {
//           content: this.state.reviewText,
//           rating: this.state.reviewRating,
//           user_id: 1
//         },
//         restaurant: {
//           restaurant_name: this.state.currentRestaurant
//         }
//       })
//     })
//     .then( res => res.json() )
//     .then(data => {
//       this.setState({
//         reviewText: '',
//         reviewRating: null
//       })
//     })
//   }
// }
