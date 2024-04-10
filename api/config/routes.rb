Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  get 'api/features', to: 'earthquake#index'
  post 'api/features/:id/comments', to: 'comments#create'

    # get 'api/features/:id', to: 'earthquake#show'
  # post '/features', to: 'earthquake#create'
end
