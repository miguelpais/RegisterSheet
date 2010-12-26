class Transaction < ActiveRecord::Base
  def self.get_balance
    transactions = Transaction.find(:all)
    balance = 0
    transactions.each do |t|
      balance += t.value
    end
    return balance
  end
end
