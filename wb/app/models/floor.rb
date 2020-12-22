class Floor < ApplicationRecord
  belongs_to :facility
  has_many :rooms
end
