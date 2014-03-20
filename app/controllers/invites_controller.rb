class InvitesController < ApplicationController

  def show
    token_url = request.original_url
    token_key = token_url.gsub("http://localhost:3000/invite?=", "")
    @token = Token.find_by(secret_key: token_key)
    @card = Card.find_by(id: @token.card_id)
  end

end
