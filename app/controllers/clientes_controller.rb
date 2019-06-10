class ClientesController < ApplicationController
	before_action :validate_user 

	def index
		@clientes = Usuario.where("admin =? AND (deactivated =? OR deactivated IS NULL)", false, false)
	end

	def ver
		@cliente = Usuario.find(params[:email])
	end

	def new
		@cliente = Usuario.new
	end

	def criar
		respond_to do |format|
			if Usuario.validar_novo_email(params[:email])
				@cliente = Usuario.invite!(:email => params[:email] , :nome => params[:nome])
				flash[:notice] =  'Convite enviado com sucesso!' 
				format.js {render inline: "location.href='/clientes/ver?email=#{params[:email]}'"}
			else
				flash[:notice] =  'Email já cadastrado no sistema.' 
				format.js {render inline: "location.reload();" }
			end
		end
	end

	def editar
		@cliente = Usuario.find(params[:email])
	end

	def atualizar
		@cliente = Usuario.find(params[:email])
		if !params[:senha].blank?
			@cliente.update(nome: params[:nome], password: params[:senha])
		else
			@cliente.update(nome: params[:nome])
		end
    	
    	respond_to do |format|
     		flash[:notice] =  'Cliente alterado com sucesso!' 
			format.js {render inline: "location.href='/clientes/ver?email=#{params[:email]}'"}
		end
	end

	def destroy
    	Usuario.update(params[:email], deactivated: true)
	    respond_to do |format|
	      format.html { redirect_to clientes_url, notice: 'Cliente desativado com sucesso.' }
	      format.json { head :no_content }
	    end
 	end
end
