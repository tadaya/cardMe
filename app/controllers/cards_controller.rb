class CardsController < ApplicationController
  before_action(:load_user, {only: [:create, :new, :edit] })

  def index
    @group = Group.new
    @user = current_user
    @connections = @user.connections
  end


  def new
    @card = @user.cards.new
  end

  def create
    @card = @user.cards.create(card_params)
    redirect_to user_path(@user)
  end

  def card_params
    params.require(:card).permit(:email, :card_name, :position, :organization, :phone_number, :user_id)
  end


private

  def load_user
    return @user = User.find(params[:user_id])
  end 

  def load_card
    return @card = @user.cards.find(params[:id])
  end

end
