class Email < ApplicationRecord
  belongs_to :emailable, polymorphic: true

  validates :address, presence: true, email: true
end
