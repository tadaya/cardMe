class Connection < ApplicationController

  def index
    @connections = current_user.connections
    render json: @connections
  end

  def show

  end

end