class CreateEarthquakes < ActiveRecord::Migration[7.1]
  def change
    unless table_exists?(:earthquakes)
      create_table :earthquakes do |t|
        t.float :mag
        t.string :external_id 
        t.string :place, null: false
        t.integer :time
        t.string :url, null: false
        t.integer :tsunami
        t.string :mag_type, null: false
        t.string :title, null: false
        t.float :longitude, null: false
        t.float :latitude, null: false

        t.timestamps
      end
    end
  end
end
