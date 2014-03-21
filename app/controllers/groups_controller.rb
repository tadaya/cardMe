class GroupsController < ApplicationController
 
  def index
    @user = current_user
    @groups = current_user.groups
    render json: @groups
  end

  def create
    @user = current_user
    @group = Group.create(user: current_user, group_name: params[:group_name])
    render json: @group
  end

  def destroy
    @user = current_user
    @group = @user.groups.find(params[:id])
    @group.destroy
  end
end