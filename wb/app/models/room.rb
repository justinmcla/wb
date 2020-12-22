class Room < ApplicationRecord
  belongs_to :floor
  belongs_to :facility
end
