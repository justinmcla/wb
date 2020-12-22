class Api::V1::FacilitiesController < Api::V1::ApiController
  def index
    @facilities = Facility.all
    render json: @facilities
  end
end
