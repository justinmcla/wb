class Api::V1::FacilitiesController < Api::V1::ApiController
  def index
    facilities = Facility.all
    options = {
      include: [:address]
    }
    render json: FacilitySerializer.new(facilities, options)
  end
end
