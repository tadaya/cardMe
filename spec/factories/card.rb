FactoryGirl.define do
  factory :card do
    card_name { Faker::Name.name }
    email { Faker::Internet.email}
    phone_number { Faker::PhoneNumber.phone_number }
    organization { Faker::Lorem.words(num = 3).join("") }
  end
end