class Card < ActiveRecord::Base

  belongs_to :user
  has_many :connections
  has_many :tokens

end