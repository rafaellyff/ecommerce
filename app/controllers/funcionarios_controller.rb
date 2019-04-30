class FuncionariosController < ApplicationController
  before_action :set_funcionario, only: [:show, :edit, :update, :destroy]

  # GET /funcionarios
  # GET /funcionarios.json
  def index
    @funcionarios = Funcionario.where(ativo: true)
  end

  # GET /funcionarios/1
  # GET /funcionarios/1.json
  def show
  end

  # GET /funcionarios/new
  def new
    @funcionario = Funcionario.new
  end

  # GET /funcionarios/1/edit
  def edit
  end

  # POST /funcionarios
  # POST /funcionarios.json
  def create
    @funcionario = Funcionario.new(funcionario_params)
    if Usuario.validar_novo_email(params[:funcionario][:usuario])
      @funcionario.usuario = params[:funcionario][:usuario]
      @usuario = Usuario.invite!(:email => params[:funcionario][:usuario] , :nome => params[:funcionario][:nome])
      respond_to do |format|
        if @funcionario.save
          format.html { redirect_to @funcionario, notice: 'Funcionário cadastrado com sucesso.' }
          format.json { render :show, status: :created, location: @funcionario }
        end
      end
    else 
      flash[:notice] =  'Email já cadastrado no sistema.' 
      render :new
    end
  end

  # PATCH/PUT /funcionarios/1
  # PATCH/PUT /funcionarios/1.json
  def update
    Usuario.find(params[:funcionario][:usuario]).update(nome: params[:funcionario][:nome])
    
    respond_to do |format|
      if @funcionario.update(funcionario_params)
        format.html { redirect_to @funcionario, notice: 'Funcionário alterado com sucesso' }
        format.json { render :show, status: :ok, location: @funcionario }
      else
        format.html { render :edit }
        format.json { render json: @funcionario.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /funcionarios/1
  # DELETE /funcionarios/1.json
  def destroy
    @funcionario.update(ativo: false)
    Usuario.update(@funcionario.usuario, deactivated: true)
    respond_to do |format|
      format.html { redirect_to funcionarios_url, notice: 'Funcionário desativado com sucesso.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_funcionario
      @funcionario = Funcionario.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def funcionario_params
      params.require(:funcionario).permit(:usuario, :salario, :ativo)
    end
end
