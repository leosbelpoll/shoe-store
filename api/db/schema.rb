# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_06_215521) do

  create_table "inventories", force: :cascade do |t|
    t.integer "store_id", null: false
    t.integer "model_id", null: false
    t.integer "inventory"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["model_id"], name: "index_inventories_on_model_id"
    t.index ["store_id"], name: "index_inventories_on_store_id"
  end

  create_table "inventories_history", force: :cascade do |t|
    t.integer "store_id", null: false
    t.integer "model_id", null: false
    t.integer "inventory"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["model_id"], name: "index_inventories_history_on_model_id"
    t.index ["store_id"], name: "index_inventories_history_on_store_id"
  end

  create_table "models", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "stores", force: :cascade do |t|
    t.string "name", null: false
  end

  add_foreign_key "inventories", "models"
  add_foreign_key "inventories", "stores"
  add_foreign_key "inventories_history", "models"
  add_foreign_key "inventories_history", "stores"
end
