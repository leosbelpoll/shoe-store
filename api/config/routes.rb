Rails.application.routes.draw do
  namespace "api" do
    namespace "v1" do
      get '/models', to: 'models#index'
      get '/models/:id', to: 'models#details'
    end
  end
end
