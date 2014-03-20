FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email } 
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
<<<<<<< HEAD
    # password "getcarded"
    # password_confirmation "getcarded"
=======
    password "getcarded"
    password_confirmation "getcarded"
>>>>>>> b8f1bb5c5ad9e68550db52df501e7f737157004a
  end
end