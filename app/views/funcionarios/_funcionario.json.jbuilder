json.extract! funcionario, :id, :usuario, :salario, :ativo, :created_at, :updated_at
json.url funcionario_url(funcionario, format: :json)
