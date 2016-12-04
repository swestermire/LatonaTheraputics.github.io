require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get about_us" do
    get :about_us
    assert_response :success
  end

  test "should get news" do
    get :news
    assert_response :success
  end

  test "should get research" do
    get :research
    assert_response :success
  end

end
