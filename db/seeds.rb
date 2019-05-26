# require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Usuario.create! :nome => 'Administrador', :email => 'smd.trabalhos@gmail.com', :password => '123456', :password_confirmation => '123456', :admin => true


