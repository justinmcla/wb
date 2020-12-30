class Api::V1::RoomsController < Api::V1::ApiController
  def index
    render json: rooms, except: [:created_at, :updated_at]
    rooms = Room.includes(:facility).where(facilities: { private: false })
  end

  def create
    room = Room.find_by(aid: params[:code])
    if room
      render json: {
        id:           room.id,
        name:         room.name,
        facility_id:  room.facility_id,
        floor_id:     room.floor_id,
        facility:     room.facility,
        floor:        room.floor,
        address:      room.facility.address,
        image:        room.facility.images.first.blob.service_url
      }
    end
  end
end
