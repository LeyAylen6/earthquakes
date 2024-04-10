class CoordinatesDTO
    attr_accessor :longitude, :latitude
  
    def initialize(longitude, latitude)
      @longitude = longitude
      @latitude = latitude
    end
end