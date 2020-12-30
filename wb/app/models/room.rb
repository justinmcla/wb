class Room < ApplicationRecord
  to_param :aid

  belongs_to :floor
  belongs_to :facility
end
