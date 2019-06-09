class AddQtdeInComprasProdutosCliente < ActiveRecord::Migration[5.2]
  def change
    add_column :compra_produtos_clientes, :qtd, :integer
  end
end
