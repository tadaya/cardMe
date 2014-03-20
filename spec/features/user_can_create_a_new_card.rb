require 'spec_helper'

describe "a user can create a new card" do
  let(:user){ FactoryGirl.create(:user) }

it "creates a new card" do
  visit "/"

end