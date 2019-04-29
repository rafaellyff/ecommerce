Rails.application.routes.draw do
  
  resources :funcionarios
  resources :produtos
  resources :categorias
  devise_for :usuarios
  
  root to: 'categorias#index'
end
