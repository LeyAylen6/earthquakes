class Comments < ApplicationRecord
    belongs_to :features, foreign_key: :feature_id
end