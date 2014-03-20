require 'spec_helper'

describe "a user can join cardMe" do
  let!(:user){ FactoryGirl.create(:user) }
  let!(:user2){ FactoryGirl.create(:user) }
  let!(:card2){ FactoryGirl.create(:card, user: user2)}
  let!(:connection) { Connection.new(user: user, card: card2) }

  it "user can view contacts" do
    login(user)
    click_button "Rolodex"
    expect(page).to have_content(user2.name)
  end

   def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
   end
end


