class AddDeactivatedToUsuarios < ActiveRecord::Migration[5.2]
  def change
    add_column :usuarios, :deactivated, :boolean
  end
end
