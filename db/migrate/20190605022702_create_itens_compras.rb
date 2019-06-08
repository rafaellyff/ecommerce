class CreateItensCompras < ActiveRecord::Migration[5.2]
  def change
    create_table :itens_compras do |t|
      t.references :compra, foreign_key: true
      t.references :produto, foreign_key: true
      t.decimal :valor
      t.integer :quantidade
      t.boolean :ativo, default: true

      t.timestamps
    end
  end
end
