class AddDate < ActiveRecord::Migration
  def self.up
    add_column :transactions, :date, :date
    add_column :checks, :date, :date
  end

  def self.down
    remove_column :transactions, :date
    remove_column :checks, :date
  end
end
