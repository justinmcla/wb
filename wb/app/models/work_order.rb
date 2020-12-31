class WorkOrder < ApplicationRecord
  to_param :confirmation

  has_secure_password

  before_create :set_confirmation
  before_create :set_status

  belongs_to :facility
  belongs_to :room

  private

  def set_confirmation
    # ~17m possibilities
    self.confirmation = SecureRandom.hex 6
    while WorkOrder.find_by confirmation: self.confirmation
      self.confirmation = SecureRandom.hex 6
    end
  end

  def set_status
    self.status = 'pending'
  end
end
