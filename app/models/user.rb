class User < ActiveRecord::Base

  has_many :cards
  has_many :groups
  has_many :connections

  validates :email, presence: true
  has_secure_password

  def send_text(user, phone)
    @user = user
    @phone = phone
    @twilio_client = Twilio::REST::Client.new ENV["TWIL_SID"], ENV["TWIL_AUTH"]
    @twilio_client.account.sms.messages.create(
      :from => "+17472013048",
      :to => "+1#{@phone}",
      :body => "http://www.cardme.com/users/#{@user.id}/cards/"
    )
  end

end