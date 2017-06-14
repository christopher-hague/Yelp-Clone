# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# {username: some_username, password_digest: some_password}
users = User.create([
  #
  {
    username: "tommyWyman",
    password: "tommy"
  },
  {
    username: "angie-burk",
    password: "angela"
  },
  {
    username: "hugh-2",
    password: "hugh"
  },
  {
    username: "clever_usernam",
    password: "clever"
  },
  {
    username: "TerrenceSmit55",
    password: "terrence"
  },
  {
    username: "sosocool",
    password: "soso"
  },
  {
    username: "your_creepy_uncle",
    password: "your"
  },
  {
    username: "under-the-table",
    password: "under"
  },
  {
    username: "IAmWithStupid",
    password: "IAm"
  },
  {
    username: "tapped-into-nature",
    password: "tapped"
  }
])

# {name: 'some name', }
restaurants = Restaurant.create([
  { name: "Burger Kingdom" },
  { name: "Pizza House" },
  { name: "Fins" },
  { name: "Chill Cafe" },
  { name: "Uncle Hank's BBQ" },
  { name: "Fat Tony's" },
  { name: "Pasta Dolce" },
  { name: "The Pitted Olive" },
  { name: "Clancy's" },
  { name: "Raw Hide" }
])

# {name: 'some name'}
categories = Category.create([
  { name: "Fast food" },
  { name: "Mexican" },
  { name: "Sushi" },
  { name: "Coffee" },
  { name: "Southern BBQ" },
  { name: "Pizza" },
  { name: "Italian" },
  { name: "Mediterranean" },
  { name: "Sandwiches" },
  { name: "New Age Paleo" }
])

# {content: 'some content', restaurant_id: some_restaurant_id, user_id: some_user_id, rating: some_rating}
reviews = Review.create([
  {
    content: "Classic burger spot (as always) but the bathroom is disgusting!! Would have been a perfect 5 otherwise",
    restaurant_id: 1,
    user_id: 1,
    rating: 2
  },
  {
    content: "Worst pizza experience ever. They don't even have stuffed crust...",
    restaurant_id: 2,
    user_id: 2,
    rating: 1
  },
  {
    content: "Atmosphere is very warm and inviting. Great service, fish was very choice. Would definitely recommend, plan to dine here again",
    restaurant_id: 3,
    user_id: 3,
    rating: 4
  },
  {
    content: "Very crowded and frantic environment, despite the name. Coffee was fine but nothing to write home about. At least the service was quick.",
    restaurant_id: 4,
    user_id: 4,
    rating: 3
  },
  {
    content: "I am actually from the South so believe me when I say: UNCLE HANK KNOWS HIS BBQ! I ordered a cut of brisket and a half slab of ribs with sides of mac and slaw. It was more than I could put down in one sitting but that's ok. EDIT: Great variety of beers on tap.",
    restaurant_id: 5,
    user_id: 5,
    rating: 5
  },
  {
    content: "I expected the business to be family owned. It may or may not have been but it seemed very commercialized and 'chain-y', for lack of a better word. Not good, not great.",
    restaurant_id: 6,
    user_id: 6,
    rating: 3
  },
  {
    content: "Excellent, authentic Italian cuisine. It reminds me of the year I spent abroad in Tuscany. I would have given a perfect 5 but I noticed that neither the wine nor olive oil was from Italy (they were bottom shelf American brands :/ )",
    restaurant_id: 7,
    user_id: 7,
    rating: 4
  },
  {
    content: "Very cool vibe. Fireplace, brick oven and a candlelit chandelier. Very 'hip' crowd, but that is to be expected at a popular spot in this part of town. Check it out if interested, if not then you're not missing anything.",
    restaurant_id: 8,
    user_id: 8,
    rating: 3
  },
  {
    content: "My go-to spot when I am in a clutch. Exactly what you'd expect from a dirty hole in the wall spot such as this. Fast, greasy sandwiches for a minimal cost.",
    restaurant_id: 9,
    user_id: 9,
    rating: 4
  },
  {
    content: "Great new restaurant to add to my list of rotating dine-out spots. Best bone marrow broth I've ever had, hands down.",
    restaurant_id: 10,
    user_id: 10,
    rating: 5
  }
])

# { user_id: some_id, restaurant_id: some_id, visited: bool }
restaurants_users = RestaurantsUsers.create([
  { user_id: 1, restaurant_id: 1, visited: true },
  { user_id: 2, restaurant_id: 2, visited: true },
  { user_id: 3, restaurant_id: 3, visited: true },
  { user_id: 4, restaurant_id: 4, visited: true },
  { user_id: 5, restaurant_id: 5, visited: true },
  { user_id: 6, restaurant_id: 6, visited: true },
  { user_id: 7, restaurant_id: 7, visited: true },
  { user_id: 8, restaurant_id: 8, visited: true },
  { user_id: 9, restaurant_id: 9, visited: true },
  { user_id: 10, restaurant_id: 10, visited: true },
])

# { category_id: some_id, restaurant_id: some_id }
categories_restaurant = CategoriesRestaurant.create([
  { restaurant_id: 1, category_id: 1 },
  { restaurant_id: 2, category_id: 2 },
  { restaurant_id: 3, category_id: 3 },
  { restaurant_id: 4, category_id: 4 },
  { restaurant_id: 5, category_id: 5 },
  { restaurant_id: 6, category_id: 6 },
  { restaurant_id: 7, category_id: 7 },
  { restaurant_id: 8, category_id: 8 },
  { restaurant_id: 9, category_id: 9 },
  { restaurant_id: 10, category_id: 10 }
])
