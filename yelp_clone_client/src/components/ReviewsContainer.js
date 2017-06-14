import React from 'react'

class ReviewsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reviewText: '',
      reviewRating: null,
      currentRestaurant: props.currentRestaurant.name,
      curRestaurantReviews: []
    }
  }

  componentDidMount() {
    // send request to a url that has an action to find each of the current restaurants reviews
    return fetch('http://localhost:3000/api/v1/restaurants')
    .then(res => res.json())
    .then(console.log)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentRestaurant: nextProps.currentRestaurant.name
    })
  }

  handleReviewChange(event) {
    this.setState({
      reviewText: event.target.value
    })
  }

  handleRatingChange(event) {
    this.setState({
      reviewRating: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.state.reviewRating === null) {
      alert("You must submit this review with a rating. Select a rating for this business in order to post your review.")
    } else {
      fetch("http://localhost:3000/api/v1/reviews", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          review: {
            content: this.state.reviewText,
            rating: this.state.reviewRating,
            user_id: 1
          },
          restaurant: {
            restaurant_name: this.state.currentRestaurant
          }
        })
      })
      .then( res => res.json() )
      .then(data => {
        this.setState({
          curRestaurantReviews: data,
          reviewText: '',
          reviewRating: null
        })
      })
    }
  }

  render() {
    console.log("review state", this.state)
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Review:
            <textarea value={this.state.reviewText} onChange={this.handleReviewChange.bind(this)} />
            Rating:
            <select onChange={this.handleRatingChange.bind(this)}>
              <option value={null}></option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <input type="submit" value="Submit Review"/>
        </form>
      </div>
    )
  }
}

export default ReviewsContainer
