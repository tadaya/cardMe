require 'spec_helper'

describe "user can group cards" do 
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  let!(:card2){ FactoryGirl.create(:card, user: user2)}
  let!(:connection) { Connection.create(user: user, card: card2) }

  it "divide card collection by group" do
    visit "/"
    login(user)
    click_link "Rolodex"
    fill_in "group_group_name", with: "Friends"
    click_button "Submit"

    expect(page).to have_content(user2.first_name)

    
  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
  
end
