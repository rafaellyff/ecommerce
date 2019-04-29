class ReferencesUsuarioToFuncionarios < ActiveRecord::Migration[5.2]
  def change
  	add_foreign_key :funcionarios, :usuarios, column: :usuario, primary_key: :email
  end
end
