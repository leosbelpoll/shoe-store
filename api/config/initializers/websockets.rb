require 'faye/websocket'
require 'eventmachine'
require 'json'

Thread.new do
    EM.run {
        ws = Faye::WebSocket::Client.new(Rails.configuration.websockets_url)
      
        ws.on :message do |event|
          inventoryInput = JSON.parse(event.data)

          model = Model.where(name: inventoryInput['model']).first_or_create()
          model.save

          store = Store.where(name: inventoryInput['store']).first_or_create()
          store.save
      
          inventoryHistory = InventoryHistory.new
          inventoryHistory.store = store
          inventoryHistory.model = model
          inventoryHistory.inventory = inventoryInput['inventory']
          inventoryHistory.save

          inventory = Inventory.where(store_id: store.id, model_id: model.id).first_or_create()
          inventory.inventory = inventoryInput['inventory']
          inventory.save
          
          verify_warning(inventory)
          verify_danger(inventory)
          min_inventories()
          max_inventories()
        end
      }
end

def min_inventories
  inventories = Inventory.order('inventory ASC, created_at DESC').limit(10)
  ActionCable.server.broadcast "room", type: 'min', items: ActiveModel::Serializer::CollectionSerializer.new(inventories, serializer: InventorySerializer).as_json
end

def max_inventories
  inventories = Inventory.joins(:store).order('inventory DESC, created_at DESC').limit(10)
  ActionCable.server.broadcast "room", type: 'max', items: ActiveModel::Serializer::CollectionSerializer.new(inventories, serializer: InventorySerializer).as_json
end

def verify_warning(inv)
  if(inv.inventory > 0 && inv.inventory <= Rails.configuration.max_range_warning)
    action_broadcast("warning", inv)
  end
end

def verify_danger(inv)
  if(inv.inventory == 0)
    action_broadcast("danger", inv)
  end
end

def action_broadcast(type, inv)
  ActionCable.server.broadcast "room", type: type, items: [ActiveModel::SerializableResource.new(inv, serializer: InventorySerializer).as_json]
end