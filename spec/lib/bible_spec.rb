require 'spec_helper'


describe Bible do
  describe '#initialize' do

    it 'loads the bible' do
      verse = Bible.find('43011035')
      verse.t.should == "Jesus wept."
      #verse = Bible.new(:verse => "love others")
      #verse.verse.should == "love others"
    end

  end
end