require "test_helper"

class StoresControllerTest < ActionDispatch::IntegrationTest
  test "when request to /stores is success" do
    get "/api/v1/stores"
    assert_response :success
  end

  test "when request to /stores?q=test is success" do
    get "/api/v1/stores?q=test"
    assert_response :success
  end

  test "when request to /stores/:id is success" do
    store = Store.find_by(name: 'Mock store 1')
    get "/api/v1/stores/" + String(store.id)
    assert_response :success
  end
end
