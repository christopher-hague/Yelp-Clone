import React from 'react'

const RestaurantShow = (props) => {
  const restaurant = props.restaurant
  if(!restaurant) {
    return (
      <div className="twelve wide raised column">
        Fill out the search bar to view restaurants in your area
      </div>
    )
  }

  return (
    <div className="twelve wide column">
      <div className="ui raised segments">
        <div className="ui segment">
          <h1>{restaurant.name}</h1>
        </div>

        <div className="ui segment">
          <div className="ui embed">
            <img src={restaurant.image_url} frameBorder="0"></img>
          </div>
        </div>

        <div className="ui segment secondary">
          {/* make it look nicer, include appropriate info*/}
          <li>Phone: {restaurant.display_phone}</ li>
          <li>Categories: {restaurant.categories.map((category) => category.title)}</li>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow
