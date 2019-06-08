require "application_system_test_case"

class ComprasTest < ApplicationSystemTestCase
  setup do
    @compra = compras(:one)
  end

  test "visiting the index" do
    visit compras_url
    assert_selector "h1", text: "Compras"
  end

  test "creating a Compra" do
    visit compras_url
    click_on "New Compra"

    check "Ativo" if @compra.ativo
    fill_in "Ccv", with: @compra.ccv
    fill_in "Cep", with: @compra.cep
    fill_in "Cidade", with: @compra.cidade
    fill_in "Contato", with: @compra.contato
    fill_in "Data", with: @compra.data
    fill_in "Data validade", with: @compra.data_validade
    fill_in "Endereco", with: @compra.endereco
    fill_in "Estado", with: @compra.estado
    fill_in "Forma pagamento", with: @compra.forma_pagamento
    fill_in "Hora", with: @compra.hora
    fill_in "Nome titular", with: @compra.nome_titular
    fill_in "Numero cartao", with: @compra.numero_cartao
    fill_in "Usuario", with: @compra.usuario
    fill_in "Valor total", with: @compra.valor_total
    click_on "Create Compra"

    assert_text "Compra was successfully created"
    click_on "Back"
  end

  test "updating a Compra" do
    visit compras_url
    click_on "Edit", match: :first

    check "Ativo" if @compra.ativo
    fill_in "Ccv", with: @compra.ccv
    fill_in "Cep", with: @compra.cep
    fill_in "Cidade", with: @compra.cidade
    fill_in "Contato", with: @compra.contato
    fill_in "Data", with: @compra.data
    fill_in "Data validade", with: @compra.data_validade
    fill_in "Endereco", with: @compra.endereco
    fill_in "Estado", with: @compra.estado
    fill_in "Forma pagamento", with: @compra.forma_pagamento
    fill_in "Hora", with: @compra.hora
    fill_in "Nome titular", with: @compra.nome_titular
    fill_in "Numero cartao", with: @compra.numero_cartao
    fill_in "Usuario", with: @compra.usuario
    fill_in "Valor total", with: @compra.valor_total
    click_on "Update Compra"

    assert_text "Compra was successfully updated"
    click_on "Back"
  end

  test "destroying a Compra" do
    visit compras_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Compra was successfully destroyed"
  end
end
