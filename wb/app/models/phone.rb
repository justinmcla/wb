class Phone < ApplicationRecord
  belongs_to :phoneable, polymorphic: true

  validates :number, presence: true
  validates :number, format: { with:
    %r{^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$}
  }
end
