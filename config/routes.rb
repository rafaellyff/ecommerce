Rails.application.routes.draw do
  
  resources :funcionarios
  resources :produtos do
  	collection do 
      get 'catalogo'
    end
  end
  resources :categorias
  devise_for :usuarios
  
  root to: 'produtos#catalogo'
end
