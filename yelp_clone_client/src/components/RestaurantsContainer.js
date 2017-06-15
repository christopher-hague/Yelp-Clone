import React from 'react'
import ReviewsContainer from './ReviewsContainer'
import { Link } from 'react-router-dom'

class RestaurantsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurantShow: '',
      restaurantIndex: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.yelp && nextProps.yelp.businesses) {
      this.setState({
        restaurantShow: nextProps.yelp.businesses[0],
        restaurantIndex: nextProps.yelp.businesses.slice(1, nextProps.yelp.businesses.length)
      })

      this.findShowReviews()
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit()
  }



  // not very clean, any change to input form causes rerender of initial query
  handleIndexClick(event) {
    event.preventDefault()
    const newShow = this.state.restaurantIndex.filter(restaurant => {
      return restaurant.name === event.target.id
    })[0]
    const newIndex = this.state.restaurantIndex

    newIndex.splice(this.state.restaurantIndex.findIndex(restaurant => restaurant === newShow), 1)
    newIndex.unshift(this.state.restaurantShow)


    this.setState({
      restaurantShow: newShow,
      restaurantIndex: newIndex
    })
  }

  findShowReviews() {
    return this.props.restaurants.filter(restaurant => {
      return restaurant.name === this.state.restaurantShow.name
    })
  }

  render() {
    // console.log("testFind:", this.findShowReviews())
    // console.log("RestaurantsContainer state:", this.state)
    // console.log("RestaurantsContainerProps", this.props)
    if(this.state.restaurantShow === '' || this.props.restaurants.length === 0) {
      return null
    }

    var showReviews = null
    if(this.findShowReviews()[0]) {
      showReviews = this.findShowReviews()[0].reviews.map(review => {
        return <ul className="ui segment" key={review.id}>{review.content}</ul>
      })
    }



    return (
      <div>
        <div className="ui search">
          <form className="ui icon input" onSubmit={this.handleSubmit.bind(this)}>
            <input onChange={this.props.handleLocationChange} type="text" className="prompt" autoComplete="off" placeholder="Enter current location" />
            <input onChange={this.props.handleTermChange} type="text" className="prompt" autoComplete="off" placeholder="Enter search term"/>
            <input type="submit" value="Submit" />
            <i aria-hidden="true" className="search icon"></i>
          </form>
        </div>

        <div className="ui grid">
          <div className="twelve wide column">
            <div className="ui raised segments">
              <div className="ui segment">
                <div className="ui jumbo image">
                  <h1>{this.state.restaurantShow.name}</h1>
                  <em>{this.state.restaurantShow.is_closed ? "Closed" : "Open"}</em>
                  <img src={this.state.restaurantShow.image_url} />
                </div>
              </div>

              <ul className="ui segment">Rating: {this.state.restaurantShow.rating}</ul>
              <ul className="ui segment">Phone: {this.state.restaurantShow.display_phone}</ul>
              <ul className="ui segment"> Address: {this.state.restaurantShow.location.display_address.map(line => line).join(" ")}</ul>
              <ul className="ui segment">Reviews:
                {showReviews}
              </ul>

              <div className="ui segment secondary">
                <ReviewsContainer currentRestaurant={this.state.restaurantShow} />
              </div>
            </div>
          </div>

          <div className="four wide column">
            <div className="ui raised segments">
              <div className="ui segment">
                <div className="ui small image">
                  {this.state.restaurantIndex.map(restaurant =>
                    <div className="ui items" key={restaurant.id}>
                      <Link to={''} onClick={(restaurant) => this.handleIndexClick(restaurant)} >
                        <h3 id={restaurant.name}>{restaurant.name}</h3>
                      </Link>
                      <img className="ui small image" src={restaurant.image_url} />
                      <div className="left floated right aligned six wide column"><em>{restaurant.is_closed ? "Closed" : "Open"}</em></div>
                      <div className="left floated right aligned six wide column">Rating: {restaurant.rating}</div>
                      <div className="left floated right aligned six wide column">Phone: {restaurant.display_phone}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default RestaurantsContainer
