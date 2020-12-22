class AddressSerializer
  include FastJsonapi::ObjectSerializer
  attributes :line_1, :line_2, :city, :state, :zip
end
