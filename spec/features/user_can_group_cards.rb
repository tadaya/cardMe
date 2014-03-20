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
    click_link "Rolodex"
    save_and_open_page
    fill_in "group_group_name", with: "Friends"
    
    click_button "Submit"
   
  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end
