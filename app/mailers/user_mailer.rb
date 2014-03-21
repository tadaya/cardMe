class UserMailer < ActionMailer::Base
  default from: "card.me.invite@gmail.com"

  def send_card(user, token, email_input)
    @token = token
    @user = user
    @email = email_input

    # @url = user_card_path(@user)
    # attachments.inline['profile.jpg'] = File.read(@user.profile_pic)
    # attachments.inline['background.jpg'] = File.read(@user.background_image_file_name)
    # attachments.inline['logo.jpg'] = File.read(@user.organization_logo_file_name)
    mail(to: @email, subject: "You have been carded!")
  end

end
