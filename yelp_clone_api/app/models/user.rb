class User < ApplicationRecord
  has_secure_password
  has_many :reviews
  has_and_belongs_to_many :restaurants
end
