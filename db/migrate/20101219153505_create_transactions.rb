class CreateTransactions < ActiveRecord::Migration
  def self.up
    create_table :transactions do |t|
      t.integer :ref
      t.text :desc
      t.float :value
      t.timestamps
    end
  end

  def self.down
    drop_table :transactions
  end
end
