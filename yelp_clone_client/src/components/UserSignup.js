import React from 'react'

class UserSignup extends React.Component {
  constructor(props) {
    super(props)

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

  testClick() {
    var click = 0
    click ++
    console.log(click)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form className="ui icon input" onSubmit={this.handleCreateUser.bind(this)}>
          <label>
            <input value={this.state.username} className="username input" onChange={this.handleUsernameChange.bind(this)} type="text" placeholder="Create username..."/>
            <input value={this.state.password} className="password input" onChange={this.handlePasswordChange.bind(this)} type="password" placeholder="Create password..."/>
            <input type="submit" className="ui submit button" value="Signup"/>
          </label>
        </form>
      </div>
    )
  }
}

export default UserSignup

// <div>
//   <form className="ui icon input" onSubmit={this.handleCreateUser.bind(this)}>
//     <label>
//       <input value={this.state.username} className="username input" onChange={this.handleUsernameChange.bind(this)} type="text" placeholder="Create username..."/>
//       <input value={this.state.password} className="password input" onChange={this.handlePasswordChange.bind(this)} type="password" placeholder="Create password..."/>
//       <input type="submit" className="ui submit button" value="Signup"/>
//     </label>
//   </form>
// </div>





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








// ################          FANCY FORM
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
//       <div className="ui blue submit button">Sign Up</div>
//     </div>
//   </div>
//
//   <div className="ui vertical divider">
//     OR
//   </div>
//
//   <div className="center aligned column" onClick={this.props.swapForm}>
//     <div className="ui big green labeled icon button">
//       <i className="signup icon"></i>
//       Login
//     </div>
//   </div>
//
// </div>
