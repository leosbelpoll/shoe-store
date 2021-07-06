require "test_helper"

class ModelTest < ActiveSupport::TestCase
  test "when save model then ok" do
    model = Model.new
    model.name = "Mock Model"
    assert model.save
    assert_not_nil(model.id)
  end

  test "when save model without name then fail" do
    model = Model.new
    assert_not model.save
  end

  test "get all" do
    models = Model.all
    assert_equal(2, models.count)
  end
end
