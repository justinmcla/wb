class Api::V1::RoomsController < Api::V1::ApiController
  before_action :authenticate_token, only: :show

  def index
    rooms = Room.includes(:facility).where(facilities: { private: false })
    render json: RoomSerializer.new(rooms)
  end

  def show
    room = Room.find_by aid: @code
    if room
      render json: RoomSerializer.new(room, include: [:facility, :floor])
    else
      render json: {errors: 'Room not found', status: :unprocessable_entity}
    end
  end
end
