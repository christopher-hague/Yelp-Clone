import React from 'react'
import RestaurantListItem from './RestaurantListItem'

const RestaurantList = (props) => {
  const restaurants = props.restaurants.map(restaurant => (
    <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
  ))

  return (
    <div className="four wide column">
      <div className="ui items">
        {restaurants}
      </div>
    </div>
  )
}

export default RestaurantList
