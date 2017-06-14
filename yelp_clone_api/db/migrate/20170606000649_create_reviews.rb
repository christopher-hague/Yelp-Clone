class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.string :content
      t.integer :user_id
      t.integer :rating

      t.timestamps
    end
  end
end

# establish has_many/belongs_to relations ships.
# make sure you can access proper attributes via the join tables
