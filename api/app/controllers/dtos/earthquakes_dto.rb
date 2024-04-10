class EarthquakesDTO 
  attr_accessor :data, :pagination

    def initialize(data, pagination)
        @data = data
        @pagination = pagination
    end
end