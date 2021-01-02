class Api::V1::FloorsController < Api::V1::ApiController
  def index
    floors = Floor.includes(:facility).where(facilities: { private: false })
    render json: floors, except: %i[created_at updated_at]
  end
end
