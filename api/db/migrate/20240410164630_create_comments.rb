class CreateComments < ActiveRecord::Migration[7.1]
    def change
        unless table_exists?(:comments)
            create_table :comments do |t|
            t.integer :feature_id, null: false
            t.string :body, null: false
            t.timestamps
            end
        end
    end
end


