require 'spec_helper'

describe Token do
  it { should belong_to(:card) }
end