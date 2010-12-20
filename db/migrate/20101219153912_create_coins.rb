class CreateCoins < ActiveRecord::Migration
  def self.up
    create_table :coins do |t|
      t.integer :onecent
      t.integer :twocent
      t.integer :fivecent
      t.integer :tencent
      t.integer :twentycent
      t.integer :fitfycent
      t.integer :oneeuro
      t.integer :twoeuro
      t.integer :fiveeuro
      t.integer :teneuro
      t.integer :twentyeuro
      t.integer :fiftyeuro
      t.integer :onehundredeuro
      t.integer :twohundredeuro
      t.integer :fivehundredeuro
      t.timestamps
    end
  end

  def self.down
    drop_table :coins
  end
end
