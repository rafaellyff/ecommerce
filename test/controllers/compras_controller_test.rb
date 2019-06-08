require 'test_helper'

class ComprasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @compra = compras(:one)
  end

  test "should get index" do
    get compras_url
    assert_response :success
  end

  test "should get new" do
    get new_compra_url
    assert_response :success
  end

  test "should create compra" do
    assert_difference('Compra.count') do
      post compras_url, params: { compra: { ativo: @compra.ativo, ccv: @compra.ccv, cep: @compra.cep, cidade: @compra.cidade, contato: @compra.contato, data: @compra.data, data_validade: @compra.data_validade, endereco: @compra.endereco, estado: @compra.estado, forma_pagamento: @compra.forma_pagamento, hora: @compra.hora, nome_titular: @compra.nome_titular, numero_cartao: @compra.numero_cartao, usuario: @compra.usuario, valor_total: @compra.valor_total } }
    end

    assert_redirected_to compra_url(Compra.last)
  end

  test "should show compra" do
    get compra_url(@compra)
    assert_response :success
  end

  test "should get edit" do
    get edit_compra_url(@compra)
    assert_response :success
  end

  test "should update compra" do
    patch compra_url(@compra), params: { compra: { ativo: @compra.ativo, ccv: @compra.ccv, cep: @compra.cep, cidade: @compra.cidade, contato: @compra.contato, data: @compra.data, data_validade: @compra.data_validade, endereco: @compra.endereco, estado: @compra.estado, forma_pagamento: @compra.forma_pagamento, hora: @compra.hora, nome_titular: @compra.nome_titular, numero_cartao: @compra.numero_cartao, usuario: @compra.usuario, valor_total: @compra.valor_total } }
    assert_redirected_to compra_url(@compra)
  end

  test "should destroy compra" do
    assert_difference('Compra.count', -1) do
      delete compra_url(@compra)
    end

    assert_redirected_to compras_url
  end
end
