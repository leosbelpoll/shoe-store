class InventorySerializer < ActiveModel::Serializer
  attributes :id, :inventory, :created_at

  belongs_to :store
  belongs_to :model
end