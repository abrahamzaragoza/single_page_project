class AddUserIdAndQuantityToProducts < ActiveRecord::Migration[6.1]
  def change
    add_reference :products, :user, null: false, foreign_key: true
    add_column :products, :quantity, :integer
  end
end
