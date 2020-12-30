class AddConfirmationToWorkOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :work_orders, :confirmation, :string
  end
end
