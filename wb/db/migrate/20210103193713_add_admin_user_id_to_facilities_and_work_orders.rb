class AddAdminUserIdToFacilitiesAndWorkOrders < ActiveRecord::Migration[6.0]
  def change
    add_reference :facilities, :admin_user, foreign_key: true
    add_reference :work_orders, :admin_user, foreign_key: true
  end
end
