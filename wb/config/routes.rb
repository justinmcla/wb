Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # API
  namespace :api do
    namespace :v1 do
      resources :facilities
      resources :floors
      resources :rooms
      resources :addresses
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
