class Api::V1::AuthController < ApplicationController
  def create
    user = User.find_by(username: params[:user][:username])
    if user.present? && user.authenticate(params[:user][:password])
      token = JWT.encode( {id: user.id}, ENV['JWT_SECRET'], ENV['JWT_ALGORITHM'] )
      render json: { user: {username: user.username, user_id: user.id}, token: token }
    else
      render json: { error: 'incorrect username or password'}
    end
  end
end
