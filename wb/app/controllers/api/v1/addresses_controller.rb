class Api::V1::AddressesController < Api::V1::ApiController
  def index
    render json: addresses,  except: [:created_at, :updated_at]
    addresses = Address.joins("INNER JOIN facilities ON addresses.addressable_id = facilities.id")
                       .where(addresses: { addressable_type: 'Facility' })
                       .where(facilities: { private: false })
  end
end
