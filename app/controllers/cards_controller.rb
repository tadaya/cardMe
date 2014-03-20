<<<<<<< HEAD
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
=======
class CardsController < ActionController::Base
  def index
    @group = Group.new
    @user = current_user
    @connections = @user.connections
>>>>>>> afc3f15007e3b57fed380e42a31fc07db1dc5b0c
  end

end