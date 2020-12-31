Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # API
  namespace :api do
    namespace :v1 do
      resources :facilities
      resources :floors
      resources :rooms, param: :aid
      resources :addresses
      resources :work_orders, param: :confirmation
      post '/auth', to: 'authentication#create'
    end
  end

  # ADMIN CONSOLE
  namespace :admin do
    get '/', to: 'admin#index'
    get '/login', to: 'sessions#new'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    resources :users, only: [:create]
    resources :facilities
  end

end
