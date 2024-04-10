class AttributesDTO
    attr_accessor :external_id, :magnitude, :place, :time, :tsunami, :mag_type, :title, :coordinates
  
    def initialize(external_id, magnitude, place, time, tsunami, mag_type, title, coordinates)
      @external_id = external_id
      @magnitude = magnitude
      @place = place
      @time = time
      @tsunami = tsunami
      @mag_type = mag_type
      @title = title
      @coordinates = coordinates
    end
end