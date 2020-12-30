class AddressSerializer
  include JSONAPI::Serializer
  attributes :id, :line_1, :line_2, :city, :state, :zip,
             :addressable_id, :addressable_type
end
