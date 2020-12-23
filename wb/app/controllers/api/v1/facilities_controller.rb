class Api::V1::FacilitiesController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    options = {
      include: [:address]
    }
    render json: FacilitySerializer.new(facilities, options)
  end
end
