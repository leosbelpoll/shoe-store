class Inventory < ApplicationRecord
    belongs_to :model
    belongs_to :store
end
