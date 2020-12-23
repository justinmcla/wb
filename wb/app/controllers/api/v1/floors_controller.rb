class Api::V1::FloorsController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    floors = []
    facilities.each do |f|
      f.floors.each do |fl|
        floors.push fl
      end
    end
    render json: floors, include: :facility, except: [:created_at, :updated_at]
  end
end
