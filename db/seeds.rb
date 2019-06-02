# require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Usuario.create! :nome => 'Administrador', :email => 'smd.trabalhos@gmail.com', :password => '123456', :password_confirmation => '123456', :admin => true
Funcionario.create! :usuario => 'smd.trabalhos@gmail.com', :salario => "1500.0" ,:ativo => true

categoria = Categoria.create! :descricao => 'Eletrônicos'
Produto.create! :nome => 'Notebook Asus Predator', :descricao => 'Computador de Portátil', preco: "5000.0", categoria_id: categoria.id
