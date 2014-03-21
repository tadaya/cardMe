require 'spec_helper'

describe "user can save card to a group" do 
  let!(:user) { FactoryGirl.create(:user) }

  let!(:card_1) { FactoryGirl.create(:card) }
  let!(:card_2) { FactoryGirl.create(:card) }
  let!(:card_3) { FactoryGirl.create(:card) }
  let!(:card_4) { FactoryGirl.create(:card) }
  let!(:card_5) { FactoryGirl.create(:card) }
  let!(:card_6) { FactoryGirl.create(:card) }

  let!(:connect_2) { Connection.create(user: user, card: card_1)}
  let!(:connect_3) { Connection.create(user: user, card: card_2)}
  let!(:connect_4) { Connection.create(user: user, card: card_3)}
  let!(:connect_5) { Connection.create(user: user, card: card_4)}
  let!(:connect_6) { Connection.create(user: user, card: card_5)}
  let!(:connect_7) { Connection.create(user: user, card: card_6)}

  let!(:group1) { Group.create(user: user, group_name: "GA people") }
  let!(:group2) { Group.create(user: user, group_name: "Bob's Pizza") }
  let!(:group3) { Group.create(user: user, group_name: "Sun Chips") }
  let!(:group4) { Group.create(user: user, group_name: "Starbucks") }
  let!(:group5) { Group.create(user: user, group_name: "Taco Bell") }
  let!(:group6) { Group.create(user: user, group_name: "Shoes") }  
 

  it "can save card to a group" do
    visit "/"
    login(user)
    click_link "Rolodex"
    expect(page).to have_content(card_2.card_name)
    
    #select connection card
    within".connection_card" do 
      find_button("#{connect_2.id}").click
    #select the group to add that connection to 
    save_and_open_page
    within "." + card_1.card_name.gsub(" ","_") do 
       page.check('GA people')
      
      click_button "Add"
      find "#" + group1.group_name.gsub(" ", "_")
      expect('#GA People').to have_content(card_2.card_name)
      end
    end
  end


  def login(user)
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_button "Log in"
  end
end
