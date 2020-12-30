class Api::V1::RoomsController < Api::V1::ApiController
  def index
    rooms = Room.includes(:facility).where(facilities: { private: false })
    render json: RoomSerializer.new(rooms)
  end

  def create
    room = Room.find_by(aid: params[:code])
    if room
      render json: RoomSerializer.new(room, include: [:facility, :floor])
    else
      render json: {errors: 'Room not found', status: :unprocessable_entity}
    end
  end
end
