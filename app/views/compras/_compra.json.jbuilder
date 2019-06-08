json.extract! compra, :id, :usuario, :data, :hora, :valor_total, :estado, :cidade, :cep, :endereco, :contato, :forma_pagamento, :numero_cartao, :nome_titular, :data_validade, :ccv, :ativo, :created_at, :updated_at
json.url compra_url(compra, format: :json)
