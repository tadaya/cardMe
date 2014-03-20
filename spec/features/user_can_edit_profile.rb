require 'spec_helper'

describe "a user can edit his/her profile info" do
  let(:user){ FactoryGirl.create(:user) }

  it "can edit profile info" do 
    visit "/"
    login(user)
    click_link "Edit Profile"

    fill_in :user_first_name, with: "Jake"
    click_button "Save Changes"

    expect(page).to have_content "Hello, Jake!"
  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end


end


