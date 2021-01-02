class WorkOrder < ApplicationRecord
  to_param :confirmation

  has_secure_password

  before_create :set_confirmation
  before_create :set_status

  belongs_to :facility
  belongs_to :room


  validates :status, presence: true
  validates :status, inclusion: { in: [
    'Pending', 'Assigned', 'On Hold',
    'Completed', 'Refused'
  ] }
  validates :discipline, presence: true
  validates :discipline, inclusion: { in: %w[
    Carpentry Electrical Grounds Housekeeping
    HVAC Moving Plumbing Other
  ] }
  validates :description, presence: true
  validates :confirmation, presence: true

  private

  def set_confirmation_and_password
    # ~17m possibilities
    self.confirmation ||= SecureRandom.hex 6
    self.password ||= self.confirmation
  end

  def set_status
    self.status ||= 'Pending'
  end
end
