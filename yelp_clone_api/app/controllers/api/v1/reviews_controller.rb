class Api::V1::ReviewsController < ApplicationController

  def index
    reviews = Review.all
    render json: reviews
  end

  def create
    restaurant = Restaurant.find_or_create_by(name: params[:restaurant][:restaurant_name])
    review = Review.new(review_params)
    review.restaurant_id = restaurant.id
    review.save
    render json: restaurant.reviews
  end

  def show
    review = Review.find(params[:id])
    render json: review
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
    review = Review.all
    render json: reviews
  end

  def update
    review = Review.find(params[:id])
    review.update(review_params)
    review.save
    reviews = Review.all
    render json: reviews
  end

  private

  def review_params
    params.require(:review).permit(:content, :user_id, :restaurant_id, :rating)
  end

  # is restaurant_params required here or will restaurant_params from restaurant controller suffice?
  # def restaurant_params
  #   params.require(:restaurant).permit(:name)
  # end
end
