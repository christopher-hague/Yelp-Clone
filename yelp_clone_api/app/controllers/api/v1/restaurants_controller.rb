require 'rest-client'
require 'byebug'
class Api::V1::RestaurantsController < ApplicationController

  def index
    restaurants = Restaurant.all
    render json: restaurants
  end

  def create
    restaurant = Restaurant.create(restaurant_params)
    restaurants = Restaurant.all
    render json: restaurants
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render json: restaurant
  end

  def destroy
    restaurant = Restaurant.find(params[:id])
    restaurant.destroy
    restaurants = Restaurant.all
    render json: restaurants
  end

  def update
    restaurant = Restaurant.find(params[:id])
    restaurant.update(restaurant_params)
    restaurant.save
    restaurants = Restaurant.all
    render json: restaurants
  end

  def hitYelp
    url = "https://api.yelp.com/v3/businesses/search?location=#{params[:location]}&term=#{params[:term]}"
    begin
      data = RestClient.get(url, headers={
        'Authorization': # token goes here
      })
    rescue RestClient::ExceptionWithResponse => e
      # data is being redefined only if there is an error
      data = e.response
    end
    render json: data
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name)
  end

end
