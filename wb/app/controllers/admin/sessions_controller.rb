class Admin::SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by email: email
    log_in user if user && user.authenticate(password)
    current_user ? redirect_to(admin_path) : deny_with_alert
  end

  def destroy
    session.clear
    redirect_to admin_login_path
  end

  private

  def log_in user
    session[:user_id] = user.id
  end

  def strong_params
    params.permit(:email, :password)
  end

  def email
    strong_params[:email]
  end

  def password
    strong_params[:password]
  end

  def deny_with_alert
    flash[:alert] = 'Invalid Credentials.'
    render :new
  end
end
