<<<<<<< HEAD
class CardsController < ActionController::Base
  def index
    @group = Group.new
=======
class CardsController < ApplicationController

  def index
    @user = current_user
    @connections = @user.connections
>>>>>>> c56339f398a82aa682333cb7c29d09bdf4a023e5
  end

end