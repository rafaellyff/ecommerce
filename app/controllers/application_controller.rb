class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
  	before_action :authenticate_usuario!
 	before_action :configure_permitted_parameters, if: :devise_controller?

	protected

	def validate_user
    if !authenticate_usuario!.admin? 
      redirect_to acesso_restrito_funcionarios_path
    end
  end
  
	def layout_by_resource
		if devise_controller?
			"devise"
		else
			"application"
		end
	end

	def configure_permitted_parameters
	   	devise_parameter_sanitizer.permit(:sign_up, keys: [:nome])
    	devise_parameter_sanitizer.permit :accept_invitation, keys: [:email, :nome]
	end
end
