class Admin::UsersController < ApplicationController
  def create
    user = User.new strong_params
    log_in user if user.save
    current_user ? redirect_to(admin_path) : deny_with_alert
  end

  private

  def log_in user
    session[:user_id] = user.id
  end

  def strong_params
    params.require(:user).permit(:name, :email, :password)
  end

  def deny_with_alert
    redirect_to admin_login_path, alert: 'Sign up failed.'
  end
end
