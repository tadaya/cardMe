class User < ActiveRecord::Base

  has_many :cards
  has_many :groups
  has_many :connections

  validates :email, presence: true

end