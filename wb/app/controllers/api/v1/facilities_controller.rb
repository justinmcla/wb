class Api::V1::FacilitiesController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    render json: facilities, except: %i[private created_at updated_at]
  end
end
