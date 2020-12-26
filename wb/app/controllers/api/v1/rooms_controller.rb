class Api::V1::RoomsController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    rooms = []
    facilities.each do |f|
      f.rooms.each do |r|
        rooms.push r
      end
    end
    render json: rooms, except: [:created_at, :updated_at]
  end

  def create
    room = Room.find_by(aid: params[:code])
    if room
      render json: { id: room.id, name: room.name, facility: room.facility, floor: room.floor, address: room.facility.address }
    end
  end
end
