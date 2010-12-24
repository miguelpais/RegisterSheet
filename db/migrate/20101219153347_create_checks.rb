class CreateChecks < ActiveRecord::Migration
  def self.up
    create_table :checks do |t|
      t.integer :id
      t.string :entidade
      t.float :value
      t.timestamps
    end
  end

  def self.down
    drop_table :checks
  end
end
