require "test_helper"

class StoreTest < ActiveSupport::TestCase
  test "when save store then ok" do
    store = Store.new
    store.name = "Mock Store"
    assert store.save
    assert_not_nil(store.id)
  end

  test "when save store without name then fail" do
    store = Store.new
    assert_not store.save
  end

  test "get all" do
    stores = Store.all
    assert_equal(2, stores.count)
  end
end
