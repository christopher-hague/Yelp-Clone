import React from 'react'
import ReviewsContainer from './ReviewsContainer'
import { Link } from 'react-router-dom'

class RestaurantsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurantShow: '',
      restaurantIndex: '',
      displayReviews: false,
      newestReview: [],
      restaurants: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.yelp.businesses && nextProps.yelp.businesses.length) {
      this.setState({
        restaurantShow: nextProps.yelp.businesses[0],
        restaurantIndex: nextProps.yelp.businesses.slice(1)
      })

      this.findShow()
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit()
    this.setState({
      displayReviews: false
    })
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

  componentDidMount() {
    if(this.props.yelp.businesses && this.props.yelp.businesses.length) {
      this.setState({
        restaurantShow: this.props.yelp.businesses[0],
        restaurantIndex: this.props.yelp.businesses.slice(1)
      })
      this.findShow()
    }
    this.fetchRestaurants()
    this.props.fetchUsers()
  }

  getNewShow(event) {
    const newShow = this.state.restaurantIndex.find(restaurant => {
      return restaurant.name === event.target.id
    })
    return newShow
  }

  getNewIndex(event) {
    const newIndex = this.state.restaurantIndex
    newIndex.splice(this.state.restaurantIndex.findIndex(restaurant => restaurant === this.getNewShow(event)), 1)
    newIndex.unshift(this.state.restaurantShow)
    return newIndex
  }

  handleIndexClick(event) {
    event.preventDefault()
    const newIndex = this.state.restaurantIndex
    localStorage.termInput = event.target.id

    this.setState({
      restaurantShow: this.getNewShow(event),
      restaurantIndex: this.getNewIndex(event),
      displayReviews: false
    })
  }

  findShow() {
    return this.state.restaurants.find(restaurant => {
      return restaurant.name === this.state.restaurantShow.name
    })
  }

  renderReviews(event) {

    this.findShow()
    if(this.state.displayReviews) {
      this.setState({
        displayReviews: false
      })
    } else {
      this.setState({
        displayReviews: true
      })
    }
  }

  render() {
    // console.log("restState", this.state)

    if(this.state.restaurantShow === '' || this.state.restaurants.length === 0) {
      return null
    }

    this.findShow()

    var showReviews = null
    if(this.findShow()) {
      showReviews = this.findShow().reviews.map(review => {
        return (
          <ul className="ui segment" key={review.id}>
            <div>
              <h3>Rating: {review.rating}</h3>
              <h6>
                Posted on {review.created_at.substring(0, 10)}
              </h6>
            </div>
            <em>{review.content}</em><br/>
            <em>  - {this.props.users.find(user => user.id === review.user_id).username}</em>
          </ul>
        )
      }).reverse()
    } else {
      showReviews = <em>**There are no reviews at this time. Be the first to submit a review!**</em>
    }

    return (
      <div>
        <div className="ui search">
          <form className="ui icon input" onSubmit={this.handleSubmit.bind(this)}>
            <input onChange={this.props.handleLocationChange} type="text" className="prompt" autoComplete="off" placeholder="Enter a location" />
            <input onChange={this.props.handleTermChange} type="text" className="prompt" autoComplete="off" placeholder="Enter search term"/>
            <input className="ui submit button" type="submit" value="Submit" />
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

              <ul className="ui segment">
                <button className="ui primary button" onClick={this.renderReviews.bind(this)}>{this.state.displayReviews ? "Hide Reviews" : "Show Reviews"}</button>
                <div>
                  {this.state.displayReviews ?  showReviews : null }
                </div>
              </ul>

              <div className="ui segment secondary">
                <ReviewsContainer
                  findShow={this.findShow.bind(this)}
                  currentRestaurant={this.state.restaurantShow}
                  userId={this.props.userId}
                  username={this.props.username}
                  fetchReviews={this.props.fetchReviews}
                  fetchRestaurants={this.fetchRestaurants.bind(this)}
                />
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
