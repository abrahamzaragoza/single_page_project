Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  get 'users/new',   to: 'users#new', as: 'new_user'
  get '/signup',     to: 'users#new'
  get '/signin',     to: 'sessions#new'
  post '/signin',    to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy', as: 'session'

  root to: 'products#index'

  resources :products
  resources :users, only: [:create]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
