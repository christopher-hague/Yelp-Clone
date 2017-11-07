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
            <img
              className="ui centered image"
              src={restaurant.image_url}
              frameBorder="0"
            />
        </div>

        <div className="ui segment secondary">
          <em>{restaurant.is_closed ? "Closed" : "Open"}</em>
          <li>{restaurant.categories.map((category) => category.title)}</li>
          <li>{restaurant.display_phone}</li>
          <li>{restaurant.location.display_address.map(line => line).join(" ")}</li>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow
