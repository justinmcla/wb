class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :line_1
      t.string :line_2
      t.string :city
      t.string :state
      t.string :zip
      t.string :addressable_type
      t.integer :addressable_id

      t.timestamps
    end
  end
end
