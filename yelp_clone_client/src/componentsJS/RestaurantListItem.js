import React from 'react'

const RestaurantListItem = (props) => {

  return (
    <div className="item">
      <div className="ui small image">
        <img src={props.restaurant.image_url}/>
      </div>
    </div>
  )
}

export default RestaurantListItem
