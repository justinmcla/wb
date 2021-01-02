class Floor < ApplicationRecord
  belongs_to :facility
  has_many :rooms

  validates :number, presence: true
  
end
