Rails.application.routes.draw do
  root to: "api/v1/products#index"

  namespace :api do
    namespace :v1 do
      resources :products do
        resources :comments, only: [:create]
      end
      root to: "products#index"
      resources :users, only: [:create]
      post '/signin',    to: 'sessions#create'
      delete '/signout', to: 'sessions#destroy', as: 'session'
    end
  end

  get '*path', to: 'api/v1/products#index'
end
