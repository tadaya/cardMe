require 'spec_helper'

describe "a user can create a new card" do
  let(:user){ FactoryGirl.create(:user) }
  let(:card){ FactoryGirl.create(:card) }

it "creates a new card" do
  visit "/"
  login(user)
  click_link "Create a new card"
  fill_in :card_email, with: card.email
  fill_in :card_phone_number, with: card.phone_number
  fill_in :card_card_name, with: card.card_name
  fill_in :card_organization, with: card.organization
  # attach_file "background_image", "#{Rails.root}/spec/fixtures/kitten1.jpeg"
  click_button "CardMe!"

  within ".welcomepage" do
    expect(page).to have_content card.email
    expect(page).to have_content "Create another card"
    expect(page).to_not have_content "Create a new card"
  end


end

 def login(user)
  fill_in :email, with: user.email
  fill_in :password, with: user.password
  click_button "Log in"
 end

end