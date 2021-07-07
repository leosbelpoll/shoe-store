require "test_helper"

class ModelsControllerTest < ActionDispatch::IntegrationTest
  test "when request to /models is success" do
    get "/api/v1/models"
    assert_response :success
  end

  test "when request to /models?q=test is success" do
    get "/api/v1/models?q=test"
    assert_response :success
  end

  test "when request to /models/:id is success" do
    model = Model.find_by(name: 'Mock model 1')
    get "/api/v1/models/" + String(model.id)
    assert_response :success
  end
end
