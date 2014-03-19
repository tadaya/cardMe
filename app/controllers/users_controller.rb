class UsersController < ApplicationController
  before_action :load_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate, :authorize, only: [:edit, :update, :show]
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

