import React from 'react'
import RestaurantsContainer from './RestaurantsContainer'
import UserSignup from './UserSignup'
import UserLogin from './UserLogin'
import SearchBar from './SearchBar'


class AppContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      loggedIn: !!localStorage.token,
      userId: localStorage.user_id,
      username: localStorage.username,
      userToken: localStorage.token,
      restaurants: [],
      categories: [],
      reviews: [],
      users: [],
      yelp: [],
      locationInput: localStorage.locationInput || 'flatiron school',
      termInput: localStorage.termInput || 'food'
    }
  }

  setTermInput(str) {
    this.setState({
      termInput: str
    })
  }

  // setTermInput(event) {
  //   this.setState({
  //     termInput: event
  //   })
  // }

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
      if(json.error) {
        alert("Could not execute search, try altering the location and/or search term.")
      } else {
        this.setState({
          yelp: json,
          locationInput: '',
          termInput: ''
        })
      }
    })
  }

  componentDidMount() {
    this.fetchCategories()
    this.fetchUsers()
    this.fetchReviews()
    this.hitYelp()
  }

  handleLocationInput(event) {
    const location = event.target.value
    localStorage.locationInput = location
    this.setState({
      locationInput: location
    })
  }

  handleTermInput(event) {
    const term = event.target.value
    localStorage.termInput = term
    this.setState({
      termInput: term
    })
  }

  handleLogin(username, id) {
    this.setState({
      loggedIn: true,
      username: username,
      userId: id,
      userToken: localStorage.token
    })
  }

  handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("locationInput")
    localStorage.removeItem("termInput")
    localStorage.removeItem("username")
    localStorage.removeItem("user_id")
    this.setState({
      loggedIn: false,
      userName: null,
      userId: null,
      userToken: undefined,
      locationInput: localStorage.locationInput || 'flatiron school',
      termInput: localStorage.termInput || 'food'
    })
  }

  render() {

    return (
      <div>
        { localStorage.getItem('token') &&
          <div>
            <button className="ui primary button" onClick={this.handleLogout.bind(this)}>Log Out</button>
            <SearchBar
            handleTermChange={this.handleTermInput.bind(this)}
            handleLocationChange={this.handleLocationInput.bind(this)}
            handleSubmit={this.hitYelp.bind(this)}
            />

            <RestaurantsContainer
            users={this.state.users}
            yelp={this.state.yelp}
            userId={this.state.userId}
            username={this.state.username}
            fetchReviews={this.fetchReviews.bind(this)}
            fetchRestaurants={this.fetchRestaurants}
            fetchUsers={this.fetchUsers.bind(this)}
            />
          </div>
        }

        { !localStorage.getItem('token') &&
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
