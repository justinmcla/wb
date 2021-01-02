class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  validates :line_1, presence: true
  validates :city,   presence: true
  validates :state,  presence: true
  validates :state,  inclusion: { in:
  %w[AL AK AZ AR CA CO CT DE DC FL
     GA HI ID IL IN IA KS KY LA ME
     MD MA MI MN MS MO MT NE NV NH
     NJ NM NY NC ND OH OK OR PA RI
     SC SD TN TX UT VT VA WA WV WI
     WY AS GU MH FM MP PW PR VI] }
  validates :zip,    presence: true
  validates :zip,    format: { with:
  /(\d{5})-?(\d{4})?/ }
end
