class CardsController < ActionController::Base
  def index
    @group = Group.new
  end

end