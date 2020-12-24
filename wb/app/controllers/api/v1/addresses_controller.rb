class Api::V1::AddressesController < Api::V1::ApiController
  def index
    facilities = Facility.public_records
    addresses = []
    facilities.each do |f|
      addresses.push f.address
    end
    render json: addresses,  except: [:created_at, :updated_at]
  end
end
