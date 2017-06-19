import React from 'react'
import RestaurantsContainer from './RestaurantsContainer'
import UserSignup from './UserSignup'
import UserLogin from './UserLogin'
import Welcome from './Welcome'
import NavBar from './NavBar'


class AppContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      loggedIn: !!sessionStorage.token,
      userId: null,
      restaurants: [],
      categories: [],
      reviews: [],
      users: [],
      yelp: [],
      locationInput: 'flatiron school',
      termInput: 'food'
    }
  }

  fetchRestaurants() {
    return fetch("http://localhost:3000/api/v1/restaurants")
      .then( res => res.json() )
      .then( json => {
        this.setState({
          restaurants: json
        })
      })
  }

  fetchCategories() {
    return fetch("http://localhost:3000/api/v1/categories")
      .then( res => res.json() )
      .then( json => {
        this.setState({
          categories: json
        })
      })
  }

  fetchReviews() {
    return fetch("http://localhost:3000/api/v1/reviews")
      .then( res => res.json() )
      .then( json => {
        this.setState({
          reviews: json
        })
      })
  }

  fetchUsers() {
    return fetch("http://localhost:3000/api/v1/users")
      .then( res => res.json() )
      .then( json => {
        this.setState({
          users: json
        })
      })
  }

  hitYelp() {
    return fetch(`http://localhost:3000/api/v1/restaurants/hitYelp?term=${this.state.termInput}&location=${this.state.locationInput}`)
    .then( res => res.json() )
    .then( json => {
      this.setState({
        yelp: json,
        locationInput: '',
        termInput: ''
      })
    })
  }

  componentDidMount() {
    this.fetchRestaurants()
    this.fetchCategories()
    this.fetchUsers()
    this.fetchReviews()
    this.hitYelp()
  }

  handleLocationInput(event) {
    const location = event.target.value
    this.setState({
      locationInput: location
    })
  }

  handleTermInput(event) {
    const term = event.target.value
    this.setState({
      termInput: term
    })
  }

  handleLogin() {
    console.log("storage", sessionStorage)
    this.setState({
      loggedIn: true
    })
  }

  handleLogout() {
    sessionStorage.removeItem("token")
    this.setState({
      loggedIn: false
    })
  }

  render() {
    console.log("app cont state",this.state)

    return (
      <div>
        { sessionStorage.getItem('token') &&
          <div>
            <button className="ui primary button" onClick={this.handleLogout.bind(this)}>Log Out</button>
            <RestaurantsContainer
            handleTermChange={this.handleTermInput.bind(this)}
            handleLocationChange={this.handleLocationInput.bind(this)}
            users={this.state.users}
            restaurants={this.state.restaurants}
            yelp={this.state.yelp}
            handleSubmit={this.hitYelp.bind(this)}
            restaurants={this.state.restaurants}
            fetchReviews={this.fetchReviews.bind(this)}
            />
          </div>
        }

        { !sessionStorage.getItem('token') &&
          <div>
            <UserLogin handleLogin={this.handleLogin.bind(this)} />
            <UserSignup />
          </div>
        }
      </div>
    )
  }
}

export default AppContainer
