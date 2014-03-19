class CreateSchema < ActiveRecord::Migration
  def change

    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :password_digest
    end

    create_table :cards do |t|
      t.references :user
      t.string :card_name
      t.string :phone_number
      t.string :organization
      t.string :position
      t.string :email
      t.attachment :background_image
      t.attachment :ogranization_logo
      t.attachment :profile_picture
    end

    create_table :connections do |t|
      t.references :user
      t.references :card
    end

    create_table :groups do |t|
      t.references :user
      t.string :group_name
    end

    create_table :connections_groups do |t|
      t.references :connection
      t.references :group
    end
  end
end
