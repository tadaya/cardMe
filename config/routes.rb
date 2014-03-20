Cardme::Application.routes.draw do
  root "welcome#index"

  resources :users do
    resources :cards, shallow: true
    resources :groups
  end

  post "/users/:id", to: "users#send_mail"
  post "/users/:id/sms", to: "users#send_sms"

  get "/login", to: "session#new"
  post "/session", to: "session#create"
  delete "/logout", to: "session#destroy"
end
