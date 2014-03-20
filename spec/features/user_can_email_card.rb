require 'spec_helper.rb'

describe "a user can email a card" do 
  let(:user) { FactoryGirl.create(:user) }

  it "sends an email with a card that is a link" do
    visit "/"
    login(user)
    fill_in 'email', with: user.email
    click_button "Email Card"

    expect(page).to have_content("Card Sent")

  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in!"
  end

end
