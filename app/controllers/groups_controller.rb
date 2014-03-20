class GroupsController < ApplicationController
 
  def create
    @user = current_user
    @group = Group.new(group_name: params[:group_name])
    @group.save
    redirect_to user_cards_path(@user)
  end
end