class Api::V1::FloorsController < Api::V1::ApiController
  def index
    render json: floors, include: :facility, except: [:created_at, :updated_at]
    floors = Floor.includes(:facility).where(facilities: { private: false })
  end
end
