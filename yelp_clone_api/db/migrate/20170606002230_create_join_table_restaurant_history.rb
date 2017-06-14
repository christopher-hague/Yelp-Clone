class CreateJoinTableRestaurantHistory < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :restaurants do |t|
      t.integer :user_id
      t.integer :restaurant_id
      t.boolean :visited
    end
  end
end
