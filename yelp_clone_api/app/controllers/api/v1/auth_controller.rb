class Api::V1::AuthController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user.present? && user.authenticate(params[:password])
      token = JWT.encode( {id: user.id}, ENV['JWT_SECRET'], ENV['JWT_ALGORITHM'] )
      render json: { user: {username: user.username}, token: token }
    else
      render json: { error: 'incorrect username or password'}
    end
  end
end
