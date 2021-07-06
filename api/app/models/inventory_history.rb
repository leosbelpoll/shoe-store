class InventoryHistory < ApplicationRecord
    self.table_name = "inventories_history"
    
    belongs_to :model
    belongs_to :store
end
