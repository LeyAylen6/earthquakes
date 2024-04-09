require "test_helper"

class EarthquokeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get earthquoke_index_url
    assert_response :success
  end

  test "should get show" do
    get earthquoke_show_url
    assert_response :success
  end

  test "should get create" do
    get earthquoke_create_url
    assert_response :success
  end

  test "should get update" do
    get earthquoke_update_url
    assert_response :success
  end

  test "should get destroy" do
    get earthquoke_destroy_url
    assert_response :success
  end
end
