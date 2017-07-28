import React from 'react'

const RestaurantShow = ({restaurant}) => {
  
  if(!restaurant) {
    return (
      <div className="twelve wide raised column">
        Fill out the search bar to view restaurants in your area
      </div>
    )
  }

  const categories = restaurant.categories.map((category) => category.title).join(", ")

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

        {/* insert review between pic and info? */}

        <div className="ui segment secondary">
          <li>Phone: {restaurant.display_phone}</ li>
          <li>Categories: {restaurant.categories.map((category) => category.title).join(", ")}</li>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow
