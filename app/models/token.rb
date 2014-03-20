class Token < ActiveRecord::Base

  belongs_to :card

  def generateKey
    self.secret_key = SecureRandom.base64
    self.expiration = Time.now + 72.hours
  end
  
end