Rails.application.routes.draw do
  
  resources :compras do
    collection do 
      match 'finalizar_compra', via: [:get, :post]
      match 'minhas_compras', via: [:get, :post]
    end
  end
  resources :funcionarios do
    collection do 
      get 'acesso_restrito'
    end
  end
  resources :produtos do
  	collection do 
      get 'catalogo'
    end
  end
  resources :categorias
  resources :clientes do 
    collection do
      match 'ver', via: [:get, :post]
      match 'criar', via: [:get, :post]
      match 'editar', via: [:get, :post]
      match 'atualizar', via: [:get, :post]
      match 'excluir', via: [:get, :post]
    end
  end

  devise_for :usuarios

  
  root to: 'produtos#catalogo'
end
