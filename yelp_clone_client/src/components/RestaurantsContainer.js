import React from 'react'
import ReviewsContainer from './ReviewsContainer'
import { Link } from 'react-router-dom'

class RestaurantsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurantShow: '',
      restaurantIndex: '',
      displayReviews: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("willReceiveProps:", nextProps)
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

  componentDidMount() {
    if(this.props.yelp && this.props.yelp.businesses) {
      this.setState({
        restaurantShow: this.props.yelp.businesses[0],
        restaurantIndex: this.props.yelp.businesses.slice(1, this.props.yelp.businesses.length)
      })

      this.findShowReviews()
    }
  }



  // not very clean, any change to input form causes rerender of initial query
  handleIndexClick(event) {
    event.preventDefault()
    const newShow = this.state.restaurantIndex.find(restaurant => {
      return restaurant.name === event.target.id
    })
    const newIndex = this.state.restaurantIndex

    newIndex.splice(this.state.restaurantIndex.findIndex(restaurant => restaurant === newShow), 1)
    newIndex.unshift(this.state.restaurantShow)


    this.setState({
      restaurantShow: newShow,
      restaurantIndex: newIndex,
      displayReviews: false
    })
  }

  findShowReviews() {
    return this.props.restaurants.find(restaurant => {
      return restaurant.name === this.state.restaurantShow.name
    })
  }

  renderReviews(event) {
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
    // console.log("testFind:", this.findShowReviews())
    console.log("RestaurantsContainer state:", this.state)
    // console.log("RestaurantsContainerProps", this.props)
    if(this.state.restaurantShow === '' || this.props.restaurants.length === 0) {
      console.log("sadjjsdjn")
      return null
    }

    var showReviews = null
    if(this.findShowReviews()) {
      showReviews = this.findShowReviews().reviews.map(review => {
        return <ul className="ui segment" key={review.id}>{review.content}</ul>
      })
    } else {
      showReviews = <em>**There are no reviews at this time. Be the first to submit a review!**</em>
    }

    return (
      <div>
        <div className="ui search">
          <form className="ui icon input" onSubmit={this.handleSubmit.bind(this)}>
            <input onChange={this.props.handleLocationChange} type="text" className="prompt" autoComplete="off" placeholder="Enter a location" />
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
              <ul className="ui segment">
                <button onClick={this.renderReviews.bind(this)}>{this.state.displayReviews ? "Hide Reviews" : "Show Reviews"}</button>
                <div>
                  {this.state.displayReviews ?  showReviews : null }
                </div>
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
