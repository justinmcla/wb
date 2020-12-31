class AddPasswordDigestToRoomsAndWorkOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :password_digest, :string
    add_column :work_orders, :password_digest, :string
  end
end
