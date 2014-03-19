require 'spec_helper'

describe "a user can join cardMe" do
  let(:user){ FactoryGirl.create(:user) }
  let(:user1){ FactoryGirl.create(:user) }

  it "creates a new user" do
    visit "/"
    click_link "Join cardMe"
    fill_in :user_email, with: user.email
    fill_in :user_first_name, with: user.first_name
    fill_in :user_password, with: user.password
    fill_in :user_password_confirmation, with: user.password_confirmation
    click_button "Join"

    within ".welcomepage" do
      expect(page).to have_content "Hello, #{user.first_name}!"
    end

    click_link "Log Out, #{user.first_name}"

  
    within ".login" do
      expect(page).to have_content "Email"
    end

    login(user)

    within ".welcomepage" do
      expect(page).to have_content "Hello, #{user.first_name}!"
    end

    
    click_link "Log Out, #{user.first_name}"

    login(user1)

    within ".welcomepage" do
      expect(page).to_not have_content "Hello, #{user.first_name}!"
      expect(page).to have_content "Hello, #{user1.first_name}"
    end

    click_link "Log Out, #{user1.first_name}"
  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end


