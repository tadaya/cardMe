require 'spec_helper'

describe "user can save card to a group" do 
  let(:user) { FactoryGirl.create(:user) }
  let(:card) { FactoryGirl.create(:card, user: user) }

  it "can save card to a group" do
    visit "/"
    login(user)
    click_link "Rolodex"
    expect(page).to have_content card
    click_button "Add to Group"

    within "#groupnames" do 
      expect(page).to have_content card 
    end
    
  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
  
end
