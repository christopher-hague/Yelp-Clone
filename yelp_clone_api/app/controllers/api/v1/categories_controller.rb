class Api::V1::CategoriesController < ApplicationController

  def index
    categories = Category.all
    render json: categories
  end

  def create
    category = Category.create(category_params)
    categories = Category.all
    render json: categories
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
    categories = Category.all
    render json: categories
  end

  def update
    category = Category.find(params[:id])
    category.update(category_params)
    category.save
    categories = Category.all
    render json: categories
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
