require_relative 'solution'
require 'pry'

describe ClickFilter do

  clicks = eval(File.read("clicks.rb"))

  describe 'Requirement 1' do
    it 'groups the clicks into arrays of clicks by hour' do
      grouped_clicks = ClickFilter.separate_by_hour(clicks)

      expect(grouped_clicks.count <= 24).to be true
      grouped_clicks.each do |hour_of_clicks|
        expect(hour_of_clicks.collect{|a| a[:timestamp].split(" ")[1].split(":")[0].to_i}.uniq.length == 1).to be true
      end
    end

    it 'returns the most expensive click in each one hour period' do
      clicks_subset = [
        { ip:'22.22.22.22', timestamp:'3/11/2016 02:02:58', amount: 7.00 },
        { ip:'11.11.11.11', timestamp:'3/11/2016 02:12:32', amount: 6.50 },
        { ip:'11.11.11.11', timestamp:'3/11/2016 02:13:11', amount: 7.25 },
        { ip:'44.44.44.44', timestamp:'3/11/2016 02:13:54', amount: 8.75 },
        { ip:'22.22.22.22', timestamp:'3/11/2016 05:02:45', amount: 11.00 }
      ]


      grouped_clicks = ClickFilter.separate_by_hour(clicks_subset)

      expect(ClickFilter.find_most_expensive(grouped_clicks)).to eql [
        { ip:'44.44.44.44', timestamp:'3/11/2016 02:13:54', amount: 8.75 },
        { ip:'22.22.22.22', timestamp:'3/11/2016 05:02:45', amount: 11.00 }
      ]

    end

    it 'returns the correct solution' do
      result_set = ClickFilter.find_most_expensive(ClickFilter.separate_by_hour(ClickFilter.filter_more_than_ten(clicks)))
      expect(result_set).to eql [
        {:ip=>"44.44.44.44", :timestamp=>"3/11/2016 02:13:54", :amount=>8.75},
        {:ip=>"11.11.11.11", :timestamp=>"3/11/2016 06:45:01", :amount=>12.0},
        {:ip=>"33.33.33.33", :timestamp=>"3/11/2016 07:02:54", :amount=>15.75},
        {:ip=>"55.55.55.55", :timestamp=>"3/11/2016 13:02:40", :amount=>8.0},
        {:ip=>"55.55.55.55", :timestamp=>"3/11/2016 14:03:04", :amount=>5.25},
        {:ip=>"55.55.55.55", :timestamp=>"3/11/2016 15:12:55", :amount=>6.25},
        {:ip=>"55.55.55.55", :timestamp=>"3/11/2016 16:22:11", :amount=>8.5},
        {:ip=>"55.55.55.55", :timestamp=>"3/11/2016 17:18:19", :amount=>11.25},
        {:ip=>"55.55.55.55", :timestamp=>"3/11/2016 18:19:20", :amount=>9.0},
      ]
    end
  end

  describe 'Requirement 2' do
    it 'returns the earliest click if more than one click ties for most expensive' do
      clicks_subset = [
        { ip:'22.22.22.22', timestamp:'3/11/2016 13:02:21', amount: 6.00 },
        { ip:'55.55.55.55', timestamp:'3/11/2016 13:02:40', amount: 8.00 },
        { ip:'44.44.44.44', timestamp:'3/11/2016 13:02:55', amount: 8.00 },
        { ip:'55.55.55.55', timestamp:'3/11/2016 13:33:34', amount: 8.00 },
        { ip:'55.55.55.55', timestamp:'3/11/2016 13:42:24', amount: 8.00 }
      ]

      grouped_clicks = ClickFilter.separate_by_hour(clicks_subset)

      expect(ClickFilter.find_most_expensive(grouped_clicks)).to eql [
        { ip:'55.55.55.55', timestamp:'3/11/2016 13:02:40', amount: 8.00 }
      ]
    end
  end

  describe 'Requirement 3' do
    it 'removes clicks with more than 10 of the same IPs' do
      filtered_clicks = ClickFilter.filter_more_than_ten(clicks)

      expect(filtered_clicks.count < clicks.count).to be true  
      filtered_clicks.each do |click|
        expect(click[:ip]).to_not eql '22.22.22.22'
      end
    end
  end

  describe 'edge cases' do
    it 'handles the edge case: one click in array' do
      one_click_array = [
        { ip:'22.22.22.22', timestamp:'3/11/2016 13:02:21', amount: 6.00 }
      ]

      grouped_clicks = ClickFilter.separate_by_hour(one_click_array)

      expect(ClickFilter.find_most_expensive(grouped_clicks)).to eql one_click_array
    end

    it 'handles the edge case: no clicks in original array' do
      empty_click_array = []
      grouped_clicks = ClickFilter.separate_by_hour(empty_click_array)
      expect(ClickFilter.find_most_expensive(grouped_clicks)).to eql empty_click_array
    end
  end
end
