class GroupsConnectionsController < ApplicationController


  def index
    @all_group_connections = ConnectionsGroups.all
  end

  def create
    @group_connection = ConnectionsGroups.create(connection_id: params[:connection], group_id: params[:group])
    render json: @group_connection
  end

  def destroy
    connections = ConnectionsGroups.where(connection_id: params[:connection])
    @group_connect = connections.find_by(group_id: params[:group])
    @group_connect.destroy
    render json: @group_connect
  end

end
