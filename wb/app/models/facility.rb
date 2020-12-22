class Facility < ApplicationRecord
  has_many :floors
  has_many :rooms
end
