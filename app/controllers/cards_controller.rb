
class CardsController < ActionController::Base
  def index
    @group = Group.new
    @user = current_user
    @connections = @user.connections
  end

end