class UserMailer < ActionMailer::Base
  default from: "card.me.invite@gmail.com"

  def send_card(user, email_input)
    @user = user
    @email = email_input
    @url = user_card_path(@user)
    attachments.inline['profile_pic.jpg'] = File.read(@user.profile_pic)
    attachments.inline['background_pic.jpg'] = File.read(@user.background_pic)
    mail(to: @email, subject: "You have been carded!")
  end

end
