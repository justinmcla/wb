class Api::V1::FloorsController < Api::V1::ApiController
  def index
    floors = Floor.includes(:facility).where(facilities: { private: false })
    render json: FloorSerializer.new(floors)
  end
end
