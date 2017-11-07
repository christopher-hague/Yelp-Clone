import React from 'react'

const RestaurantListItem = ({restaurant, handleClick}) => {

  return (
    <div className="ui raised segments">
      <div className="ui center aligned segment" onClick={() => handleClick(restaurant)}>
        <h3>{restaurant.name}</h3>
      </div>

      <div className="ui segment">
        <div className="item" onClick={() => handleClick(restaurant)}>
          <img className="ui centered small image" src={restaurant.image_url} />
        </div>
      </div>

      <div className="ui segment secondary">
        <em>{restaurant.is_closed ? "Closed" : "Open"}</em> <br/>
        <em>{restaurant.categories.map((category) => category.title)}</em> <br/>
        <em>{restaurant.display_phone}</em> <br/>
      </div>
    </div>
  )
}

export default RestaurantListItem

// <div className="item">
//
//   <div className="ui small image">
//     <img src={restaurant.image_url}/>
//   </div>
//
//   <div className="content">
//     <a className="header">{restaurant.name}</a>
//     <div className="description">
//       <p>{restaurant.is_closed ? "Closed" : "Open"}</p>
//     </div>
//
//     <div className="extra">
//       <p>{restaurant.price}</p>
//     </div>
//   </div>
//
// </div>
