class Admin::FacilitiesController < ApplicationController
  before_action :redirect_if_not_logged_in

  def new
    @facility = Facility.new
  end

  def create
  end

end
