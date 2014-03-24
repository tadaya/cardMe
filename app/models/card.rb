class Card < ActiveRecord::Base

  belongs_to :user
  has_many :connections
  has_many :tokens

    has_attached_file :background_image, :styles => {:cardsize => "150x262>"},
                    :storage => :s3,
                    :bucket => 'cardMe',
                    :s3_credentials => {
                    :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                    :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    }
    has_attached_file :ogranization_logo, :styles => {:logo => "50x50>"},
                    :storage => :s3,
                    :bucket => 'cardMe',
                    :s3_credentials => {
                    :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                    :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    }                    
    has_attached_file :profile_picture, :styles => {:thumb => "50x40>"},
                    :storage => :s3,
                    :bucket => 'cardMe',
                    :s3_credentials => {
                    :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                    :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    }

  validates_attachment_content_type :profile_picture, :content_type => ['image/jpeg', 'image/png']
  validates_attachment_content_type :background_image, :content_type => ['image/jpeg', 'image/png']
  validates_attachment_content_type :ogranization_logo, :content_type => ['image/jpeg', 'image/png']

  validates_attachment_size :background_image, :less_than => 5.megabytes
  validates_attachment_size :ogranization_logo, :less_than => 5.megabytes
  validates_attachment_size :profile_picture, :less_than => 5.megabytes


  def company_summary
    org = self.organization
    org = org.downcase
    org = org.gsub(" ","_")
    org = org.gsub(/[\&\'\,']/, "")
    puts org
    response = HTTParty.get("https://www.googleapis.com/freebase/v1/topic/en/#{org}?filter=/organization/common/topic/article&key=AIzaSyCDr3U_5O8wWfSslYbrMgf59aGiZbXjuPY")
    return response["property"]["/common/topic/article"]["values"][0]["property"]["/common/document/text"]["values"][0]["value"]
  end

end