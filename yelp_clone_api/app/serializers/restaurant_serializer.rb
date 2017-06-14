class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :reviews, :name
end
