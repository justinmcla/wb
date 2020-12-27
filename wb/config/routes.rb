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
  end

  # AUTH
  namespace :auth do
    get '/google_oauth2/callback', to: 'google#create'
    get '/microsoft_office365/callback', to: 'microsoft#create'
  end
end
