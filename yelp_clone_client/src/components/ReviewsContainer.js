import React from 'react'

class ReviewsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reviewText: '',
      reviewRating: null,
      currentRestaurant: props.currentRestaurant.name,
      displayReviewForm: false
    }
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
    if(this.state.reviewRating === null || this.state.reviewText === '') {
      alert("You must submit this review with content and a rating. Write a review and select a rating for this business in order to post your review.")
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
            // use this.props.user_id instead of session storage?
            user_id: localStorage.user_id,
            username: localStorage.userame
          },
          restaurant: {
            restaurant_name: this.state.currentRestaurant
          }
        })
      })
      .then( res => res.json() )
      .then(data => {
        this.props.fetchRestaurants()
        this.setState({
          reviewText: '',
          reviewRating: null,
          displayReviewForm: false
        })
      })
    }
  }

  toggleReviewShow() {
    if(this.state.displayReviewForm) {
      this.setState({
        displayReviewForm: false
      })
    } else {
      this.setState({
        displayReviewForm: true
      })
    }
  }

  render() {
    return (
      <div>
        <button className="ui primary button" onClick={this.toggleReviewShow.bind(this)}>{this.state.displayReviewForm ? "Cancel" : "Write a Review"}</button>
        {!this.state.displayReviewForm ? null : (
          <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Review:
              <textarea className="prompt" value={this.state.reviewText} onChange={this.handleReviewChange.bind(this)} />
              Rating:
              <select className="ui selection dropdown" onChange={this.handleRatingChange.bind(this)}>
                <option className="item" value={null}></option>
                <option className="item" value={1}>1</option>
                <option className="item" value={2}>2</option>
                <option className="item" value={3}>3</option>
                <option className="item" value={4}>4</option>
                <option className="item" value={5}>5</option>
              </select>
            </label>
            <input className="ui primary button" type="submit" value="Submit Review"/>
          </form>
        )}

      </div>
    )
  }
}

export default ReviewsContainer
