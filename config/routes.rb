Cardme::Application.routes.draw do
  root "welcome#index"

  resources :users do
    resources :cards
  end

  get "/login", to: "session#new"
  post "/session", to: "session#create"
  delete "/logout", to: "session#destroy"

end
