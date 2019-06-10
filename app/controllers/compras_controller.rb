class ComprasController < ApplicationController
  # skip_before_action :authenticate_usuario!, only: [:save_produtos_cliente]
  before_action :set_compra, only: [:show, :edit, :update, :destroy]
  before_action :validate_user , only: [:index, :edit, :new]  

  def minhas_compras
    @compras = Compra.where(usuario: current_usuario.email,ativo: true).order(data: :desc)
  end
  # GET /compras
  # GET /compras.json
  def index
    @compras = Compra.where(ativo: true).order(data: :desc)
  end

  def save_produtos_cliente
    produtos_string = request.raw_post
    produtos_json = JSON.parse(produtos_string)
    
    co = CompraProdutosCliente.where(cliente_id: current_usuario.id)
    co.delete_all if !produtos_json.blank?
    
    produtos_json.each do |produto_ind|
      produto = Produto.find(produto_ind.select{ |k,val| k == 'produto' }.values.first)
      qtde = produto_ind.select{ |k,val| k == 'qtde' }.values.first
      compra_produto_cliente = CompraProdutosCliente.new cliente_id: current_usuario.id, produto_id: produto.id, qtd: qtde
      compra_produto_cliente.save
    end
  end

  def finalizar_compra
    @compra = Compra.new
    @produtos = get_produtos
  end

  # GET /compras/1
  # GET /compras/1.json
  def show
    @itens = ItensCompra.where(compra_id: params[:id], ativo: true)
  end

  # GET /compras/1/edit
  def edit
    @produtos = ItensCompra.where(compra_id: params[:id])
  end

  # POST /compras
  # POST /compras.json
  def create
    @produtos = get_produtos
    
    @compra = Compra.new(compra_params)
    @compra.data = Date.today
    @compra.hora = Time.now.strftime("%H:%M:%S")
    @compra.valor_total = params[:compra][:valor_total].to_f
    @compra.status = "Solicitado"

    respond_to do |format|
      if @compra.save
        @produtos.each do |produto|
          ItensCompra.create(compra_id: @compra.id, produto_id: produto[:produto][:id], valor: produto[:produto][:preco],quantidade: produto[:qtde])
        end
        format.html { redirect_to @compra, notice: 'Compra efetuada com sucesso.' }
        format.json { render :show, status: :created, location: @compra }
      else
        format.html { render :new }
        format.json { render json: @compra.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /compras/1
  # PATCH/PUT /compras/1.json
  def update
    respond_to do |format|
      if @compra.update(compra_params)
        @itens = ItensCompra.where(compra_id: params[:id])
        @itens.each do |item| 
          qtde = params[("quantidade_" + item.id.to_s).to_sym]
          valor = params[("valor_" + item.id.to_s).to_sym]
          ativo = params[("remover_" + item.id.to_s).to_sym].nil? ? "true" : "false"

          item.update(quantidade: qtde, valor: valor, ativo: ativo)
        end
        format.html { redirect_to @compra, notice: 'Compra alterada com sucesso.' }
        format.json { render :show, status: :ok, location: @compra }
      else
        format.html { render :edit }
        format.json { render json: @compra.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /compras/1
  # DELETE /compras/1.json
  def destroy
    @compra.update(ativo: false)
    respond_to do |format|
      format.html { redirect_to compras_url, notice: 'Compra excluída com sucesso.' }
      format.json { head :no_content }
    end
  end

  def mudar_status
    @compra = Compra.find(params[:id])
    @compra.update(status: params[:status])
    respond_to do |format|
      format.html { redirect_to @compra, notice: 'Status alterado com sucesso.' }
      format.json { render :show, status: :ok, location: @compra }
    end
  end
  private
    def get_produtos
      prod = CompraProdutosCliente.where(cliente_id: current_usuario.id).pluck(:produto_id, :qtd)
      @produtos = []
      prod.each do |produto, qtd|
        @produtos.push({produto: Produto.find(produto) , qtde: qtd })
      end
      return @produtos
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_compra
      @compra = Compra.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def compra_params
      params.require(:compra).permit(:usuario, :data, :hora, :valor_total, :estado, :cidade, :cep, :endereco, :contato, :forma_pagamento, :numero_cartao, :nome_titular, :data_validade, :ccv,:status, :ativo)
    end
end
