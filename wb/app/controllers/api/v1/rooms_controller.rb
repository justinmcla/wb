class Api::V1::RoomsController < Api::V1::ApiController
  before_action :authenticate_token, only: :show

  def index
    rooms = Room.includes(:facility).where(facilities: { private: false })
    render json: rooms, except: %i[created_at updated_at aid password_digest]
  end

  def show
    room = Room.find_by aid: @code
    room ? render_room(room) : render_no_record
  end

  private

  def render_room(room)
    options = { include: %i[facility facility.address floor] }
    render json: RoomSerializer.new(room, options)
  end
end
