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
          <div className="ui embed">
            <iframe src={restaurant.image_url} frameBorder="0"></iframe>
          </div>
        </div>

        <div className="ui segment">
          {restaurant.name} {restaurant.price}
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
