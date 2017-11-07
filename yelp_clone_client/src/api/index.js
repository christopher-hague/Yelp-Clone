export function hitYelp(term, location) {
  return fetch(`http://localhost:3000/api/v1/restaurants/hitYelp?term=${term}&location=${location}`)
  .then( res => res.json() )
  .then( json => {
    if(json.error) {
      alert("Could not execute search. Try altering the location and/or search term.")
    } else {
      this.setState({
        restaurants: json.businesses,
        restaurantShow: json.businesses[0]
      })
    }
  })
}
