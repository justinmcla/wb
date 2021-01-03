Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: redirect('/admin')

  # API
  namespace :api do
    namespace :v1 do
      resources :facilities, only: :index
      resources :floors, only: :index
      resources :rooms, only: %i[index show], param: :aid
      resources :addresses, only: :index
      resources :work_orders, only: %i[show create update], param: :confirmation
      resource  :auth, only: :create, controller: 'authentication'
    end
  end

  # ADMIN CONSOLE
  namespace :admin do
    root to: 'admin#index'
    get '/login', to: 'sessions#new'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    resources :users, only: :create
    resources :facilities
  end
end
