Cardme::Application.routes.draw do
  root "welcome#index"

  resources :users do
    resources :cards
    resources :groups
  end

end
