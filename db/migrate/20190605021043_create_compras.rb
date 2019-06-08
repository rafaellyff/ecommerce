class CreateCompras < ActiveRecord::Migration[5.2]
  def change
    create_table :compras do |t|
      t.string :usuario
      t.date :data
      t.time :hora
      t.decimal :valor_total
      t.string :estado
      t.string :cidade
      t.string :cep
      t.string :endereco
      t.string :contato
      t.string :forma_pagamento
      t.string :numero_cartao
      t.string :nome_titular
      t.string :data_validade
      t.integer :ccv
      t.string :status
      t.boolean :ativo, default: true

      t.timestamps
    end

    add_foreign_key :compras, :usuarios, column: :usuario, primary_key: :email
  end
end
