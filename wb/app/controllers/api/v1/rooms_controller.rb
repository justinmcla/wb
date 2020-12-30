class Api::V1::RoomsController < Api::V1::ApiController
  def index
    rooms = Room.includes(:facility).where(facilities: { private: false })
    render json: RoomSerializer.new(rooms)
  end

  def show
    room = set_room
    if room
      render json: RoomSerializer.new(room, include: [:facility, :floor])
    else
      render json: {errors: 'Room not found', status: :unprocessable_entity}
    end
  end

  private

  def set_room
    Room.find_by aid: params[:aid]
  end
end
