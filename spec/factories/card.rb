FactoryGirl.define do
  factory :card do
    card_name { Faker::Name.name } 
  end
end