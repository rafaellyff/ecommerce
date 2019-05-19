class AddFotoToProdutos < ActiveRecord::Migration[5.2]
  def up
    add_attachment :produtos, :foto
  end

  def down
    remove_attachment :produtos, :foto
  end
end
