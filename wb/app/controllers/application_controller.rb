class ApplicationController < ActionController::Base
  def current_user
    User.find_by_id session[:user_id]
  end

  def redirect_if_not_logged_in
    redirect_to admin_login_path unless current_user
  end
end
