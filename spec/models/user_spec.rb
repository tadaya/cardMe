require 'spec_helper'

describe User do
  it { should have_many(:connections) }
  it { should have_many(:groups) }
  it { should have_many(:cards) }
  it { should validate_presence_of(:email) }
end