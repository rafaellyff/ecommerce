class CreateFuncionarios < ActiveRecord::Migration[5.2]
  def change
    create_table :funcionarios do |t|
      t.string :usuario
      t.decimal :salario
      t.boolean :ativo, default: true

      t.timestamps
    end
    add_index :funcionarios, :usuario, unique: true
  end
end
