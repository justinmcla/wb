class CreateAlternateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :alternate_contacts do |t|
      t.string :name
      t.references :work_order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
