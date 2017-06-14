class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create(user_params)
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    users = User.all
    render json: users
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    user.save
    users = User.all
    render json: users
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
