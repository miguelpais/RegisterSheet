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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101219153912) do

  create_table "checks", :force => true do |t|
    t.string   "entidade"
    t.float    "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "coins", :force => true do |t|
    t.integer  "onecent"
    t.integer  "twocent"
    t.integer  "fivecent"
    t.integer  "tencent"
    t.integer  "twentycent"
    t.integer  "fitfycent"
    t.integer  "oneeuro"
    t.integer  "twoeuro"
    t.integer  "fiveeuro"
    t.integer  "teneuro"
    t.integer  "twentyeuro"
    t.integer  "fiftyeuro"
    t.integer  "onehundredeuro"
    t.integer  "twohundredeuro"
    t.integer  "fivehundredeuro"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", :force => true do |t|
    t.integer  "ref"
    t.text     "desc"
    t.float    "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
