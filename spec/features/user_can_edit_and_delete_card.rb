require 'spec_helper'

describe "a user can edit a card" do
  let(:user){ FactoryGirl.create(:user) }
  let(:card){ FactoryGirl.create(:card) }


it "edits a card" do
  visit "/"
  login(user)
  add_card(card)
  first(:link, "edit").click
  fill_in :card_organization, with: "Kittens are cool"
  save_and_open_page
  click_button "Save Changes"

  within ".card" do
    expect(page).to have_content "Kittens are cool"
    expect(page).to_not have_content card.organization
  end
end


  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end

  def add_card(card)
    click_link "Create a new card"
    fill_in :card_email, with: card.email
    fill_in :card_phone_number, with: card.phone_number
    fill_in :card_card_name, with: card.card_name
    fill_in :card_organization, with: card.organization
    click_button "CardMe!"
  end
end