class CreateCompraProdutosClientes < ActiveRecord::Migration[5.2]
  def change
    create_table :compra_produtos_clientes do |t|
      t.integer :cliente_id
      t.integer :produto_id

      t.timestamps
    end
  end
end
