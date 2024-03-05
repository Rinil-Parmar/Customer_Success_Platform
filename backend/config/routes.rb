Rails.application.routes.draw do
  # resources :posts
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :projects
      resources :clients
      resources :overviews
      resources :audit_histories
      resources :version_histories
      resources :projects do
        resources :audit_histories, only: [:index, :create, :update, :destroy]
        resources :version_histories, only: [:index, :create, :update, :destroy]
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

# rails generate scaffold VersionHistory version_no:string version_type:string change:text reason:text created_by:string revision_date:date approve_date:date approved_by:string project:references



