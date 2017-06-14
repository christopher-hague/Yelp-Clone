class Restaurant < ApplicationRecord
  has_many :reviews
  has_many :categories_restaurants
  has_many :categories, through: :categories_restaurants
  has_many :users, through: :reviews
end
