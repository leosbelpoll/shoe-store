require "test_helper"

class InventoryTest < ActiveSupport::TestCase
  test "when save inventory then ok" do
    inventory = Inventory.new
    store = Store.find_by(name: 'Mock store 1')
    inventory.store = store
    model = Model.find_by(name: 'Mock model 1')
    inventory.model = model
    inventory.inventory = 23

    assert inventory.save
    assert_equal(store.id, inventory.store_id)
    assert_equal(model.id, inventory.model_id)
    assert_equal(23, inventory.inventory)
    assert_not_nil(inventory.created_at)
  end

  test "get all" do
    inventory = Inventory.all
    assert_equal(2, inventory.count)
  end
end
