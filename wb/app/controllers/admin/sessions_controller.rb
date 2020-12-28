class Admin::SessionsController < ApplicationController
  def new
    @user = User.new
  end
  end
end
