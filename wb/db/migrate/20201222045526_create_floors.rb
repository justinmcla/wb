class CreateFloors < ActiveRecord::Migration[6.0]
  def change
    create_table :floors do |t|
      t.integer :number
      t.references :facility, null: false, foreign_key: true

      t.timestamps
    end
  end
end
