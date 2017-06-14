class CreateJoinTableRestaurantCategories < ActiveRecord::Migration[5.0]
  def change
    create_join_table :restaurants, :categories do |t|
      t.integer :restaurant_id
      t.integer :category_id
    end
  end
end
