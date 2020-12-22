Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # API
  namespace :api do
    namespace :v1 do
    end
  end

  # ADMIN CONSOLE
  namespace :admin do
    get '/', to: 'admin#index'
  end

end
