class CreateEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :emails do |t|
      t.string :address
      t.references :emailable, polymorphic: true

      t.timestamps
    end
  end
end
