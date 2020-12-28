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

  end
end
