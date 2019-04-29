class Usuario < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.validar_novo_email(email)
		
		if self.where(email: email)
			return true
		else
			return false
		end

	end
end
