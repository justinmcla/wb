class Room < ApplicationRecord
  to_param :aid

  has_secure_password

  belongs_to :floor
  belongs_to :facility
end
