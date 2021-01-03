Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
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

end
