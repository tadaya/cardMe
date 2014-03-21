require 'spec_helper'

describe "user can group cards" do 
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  let(:user3) { FactoryGirl.create(:user) }
  let!(:card){ FactoryGirl.create(:card, user: user)}
  let(:token) { Token.create(card_id: card.id) }

  it "can see invite from another user" do
    visit '/'
    login(user)
    fill_in("email", with: user2.email)
    click_button "Email Card"
    token.generateKey
    logout(user)

    visit '/'
    login(user2)
    visit '/invite?=' + token.secret_key.to_s
    save_and_open_page
    expect(page).to have_content user.card.email
  end

  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end

  def logout(user)
    click_link "Log Out, #{user.first_name}"
  end
  
end

