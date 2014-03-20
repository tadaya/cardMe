# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140320203318) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: true do |t|
    t.integer  "user_id"
    t.string   "card_name"
    t.string   "phone_number"
    t.string   "organization"
    t.string   "position"
    t.string   "email"
    t.string   "background_image_file_name"
    t.string   "background_image_content_type"
    t.integer  "background_image_file_size"
    t.datetime "background_image_updated_at"
    t.string   "ogranization_logo_file_name"
    t.string   "ogranization_logo_content_type"
    t.integer  "ogranization_logo_file_size"
    t.datetime "ogranization_logo_updated_at"
    t.string   "profile_picture_file_name"
    t.string   "profile_picture_content_type"
    t.integer  "profile_picture_file_size"
    t.datetime "profile_picture_updated_at"
  end

  create_table "connections", force: true do |t|
    t.integer "user_id"
    t.integer "card_id"
  end

  create_table "connections_groups", force: true do |t|
    t.integer "connection_id"
    t.integer "group_id"
  end

  create_table "groups", force: true do |t|
    t.integer "user_id"
    t.string  "group_name"
  end

  create_table "tokens", force: true do |t|
    t.integer  "card_id"
    t.string   "secret_key"
    t.datetime "expiration"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
  end

end
