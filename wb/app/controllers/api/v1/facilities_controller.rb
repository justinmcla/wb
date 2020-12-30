class Api::V1::FacilitiesController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    render json: FacilitySerializer.new(facilities)
  end
end
