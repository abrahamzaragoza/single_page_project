Rails.application.routes.draw do
  get 'users/new', to: 'users#new', as: 'new_user'
  get '/signup',   to: 'users#new'
  root to: 'products#index'

  resources :products
  resources :users, only: [:create]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
