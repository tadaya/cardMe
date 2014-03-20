require 'spec_helper'

describe "user can group cards" do 
  let(:user) { FactoryGirl.create(:user) }
  let(:card) { FactoryGirl.create(:card, user: user) }

  # 5.times do {
  #   let(:connection) { FactoryGirl.create(:user) }
  #   FactoryGirl.create(:card, user: connnection)
  # }

  it "divide card collection by group" do
    visit "/"
    login(user)
    visit user_cards_path(user)
    click_button "New Group"
    fill_in "Group", with: "Friends"
    click_button "Save"
  end

  def login(user)
    click_link "Log in"
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end
