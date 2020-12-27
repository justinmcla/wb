class Api::V1::FacilitiesController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    render json: facilities, include: [:address, :floors, :rooms],  except: [:created_at, :updated_at]
  end
end
