class UsersController < ApplicationController
  before_action :load_user, only: [:show, :edit, :update, :destroy, :send_mail, :send_sms]
  before_action :authenticate, :authorize, only: [:edit, :update, :show]
  
  def send_mail
      @email = params[:email]
      @card = Card.find_by(card_name: params[:my_cards])
      @token = Token.new(card: @card)
      @token.generateKey
      @token.save
      if UserMailer.send_card(@user, @token, @email).deliver
        flash[:notice] = 'Card Sent!'
      else
        flash[:notice] = "Problems sending mail - please double check the address"
      end

      redirect_to user_path
  end

  def send_sms
    @phone = params[:phone]
    @card = Card.find_by(card_name: params[:my_cards])
    if @user.send_text(@user, @phone, @card)
      flash[:text_notice] = 'Text Sent!'
    else
      flash[:text_notice] = 'Problems sending text - please double check the phone number'
    end

    redirect_to user_path
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if  @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  def show
    @cards = @user.cards.all
    @card = Card.find_by(card_name: params[:card_name])
    @my_card = @cards.map(&:card_name)
  end

  def edit
    @update_worked = true
  end

  def update
    @update_worked = @user.update(user_params)

    if @update_worked
      redirect_to user_path(@user)
    else
      render(:edit)
    end
  end

  def load_user
    return @user = User.find(params[:id])
  end 

  def authenticate
    unless logged_in?
      redirect_to root_path
    end
  end

  def authorize
    unless current_user == @user
      redirect_to root_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end

end

