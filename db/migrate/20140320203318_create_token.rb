class CreateToken < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.references :card
      t.string :secret_key
      t.datetime :expiration
      t.timestamps
    end
  end
end
