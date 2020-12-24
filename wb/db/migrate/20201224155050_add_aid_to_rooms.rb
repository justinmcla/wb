class AddAidToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :aid, :string
    add_index :rooms, :aid
  end
end
