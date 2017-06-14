import React from 'react'
import RestaurantsContainer from './RestaurantsContainer'
import UsersContainer from './UsersContainer'
import ReviewsContainer from './ReviewsContainer'
import NavBar from './NavBar'

class AppContainer extends React.Component {
  constructor() {
    super()

    this.state = {
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
        yelp: json
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

  render() {
    console.log(this.state)
    return (
      <div>
        <RestaurantsContainer
          handleTermChange={this.handleTermInput.bind(this)}
          handleLocationChange={this.handleLocationInput.bind(this)}
          restaurants={this.state.restaurants}
          yelp={this.state.yelp}
          handleSubmit={this.hitYelp.bind(this)}
        />
      </div>
    )
  }
}

export default AppContainer
