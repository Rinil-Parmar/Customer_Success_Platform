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

ActiveRecord::Schema[7.1].define(version: 2024_03_05_113237) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audit_histories", force: :cascade do |t|
    t.date "date"
    t.string "reviewed_by"
    t.string "status"
    t.text "reviewed_section"
    t.text "queries"
    t.text "action_item"
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_audit_histories_on_project_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "overviews", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.text "project_overview"
    t.text "purpose"
    t.text "goals"
    t.text "objectives"
    t.decimal "budget"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_overviews_on_project_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "project_name"
    t.string "project_desc"
    t.string "project_scope"
    t.string "project_stack"
    t.string "project_status"
    t.string "project_manager"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "version_histories", force: :cascade do |t|
    t.string "version_no"
    t.string "version_type"
    t.text "change"
    t.text "reason"
    t.string "created_by"
    t.date "revision_date"
    t.date "approve_date"
    t.string "approved_by"
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_version_histories_on_project_id"
  end

  add_foreign_key "audit_histories", "projects"
  add_foreign_key "overviews", "projects"
  add_foreign_key "version_histories", "projects"
end
