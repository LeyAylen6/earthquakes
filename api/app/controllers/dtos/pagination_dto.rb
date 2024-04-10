class PaginationDTO 
    attr_accessor :current_page, :total, :per_page

    def initialize(current_page, total, per_page)
        @current_page = current_page
        @total = total
        @per_page = per_page
    end
end
