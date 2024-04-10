class AddValidationsOnFields < ActiveRecord::Migration[7.1] 
  def change   
    add_check_constraint :earthquakes, 'mag >= -1.0 AND mag <= 10.0'
    add_check_constraint :earthquakes, 'latitude >= -90.0 AND latitude <= 90.0'
    add_check_constraint :earthquakes, 'longitude >= -180.0 AND longitude <= 180.0'
  end
end
