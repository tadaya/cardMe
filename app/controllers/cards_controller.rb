class CardsController < ApplicationController
  
  def index
    @group = Group.new
    @user = current_user
    @connections = @user.connections
  end

end
