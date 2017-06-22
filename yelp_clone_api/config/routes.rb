Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      get 'restaurants/hitYelp' => 'restaurants#hitYelp'
      get 'restaurant/reviews' => 'restaurants#reviews'
      resources :auth
      resources :categories
      resources :restaurants
      resources :reviews
      resources :users

      #post '/user', to: 'auth#create', as
    end
  end

  # resources :users, only: :index
  # resources :categories, only: :index
  # resources :reviews, only: :index
end
