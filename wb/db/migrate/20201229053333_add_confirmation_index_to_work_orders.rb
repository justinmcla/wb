class AddConfirmationIndexToWorkOrders < ActiveRecord::Migration[6.0]
  def change
    add_index :work_orders, :confirmation
  end
end
