import React from 'react'
import RestaurantShow from './RestaurantShow'
import RestaurantList from './RestaurantList'
import SearchBar from './SearchBar'

class appContainer2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      restaurantShow: null
    }
  }

  componentDidMount() {
    this.hitYelp()
  }

  hitYelp(term, location) {
    return fetch(`http://localhost:3000/api/v1/restaurants/hitYelp?term=${term}&location=${location}`)
    .then( res => res.json() )
    .then( json => {
      if(json.error) {
        alert("Could not execute search. Try altering the location and/or search term.")
      } else {
        this.setState({
          restaurants: json.businesses,
          restaurantShow: json.businesses[0]
        })
      }
    })
  }

  handleSelectRestaurant(restaurant) {
    this.setState({
      restaurantShow: restaurant
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="ui container">
        <SearchBar hitYelp={this.hitYelp.bind(this)} />
        <div className="ui grid">
          <RestaurantShow restaurant={this.state.restaurantShow} />
          <RestaurantList
            restaurants={this.state.restaurants}
            handleSelectRestaurant={(restaurant) => this.handleSelectRestaurant(restaurant)}
          />
        </div>
      </div>
    )
  }
}

export default appContainer2
