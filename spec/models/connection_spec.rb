require 'spec_helper'

describe Connection do
  it { should belong_to(:user) }
  it { should belong_to(:card) }
end