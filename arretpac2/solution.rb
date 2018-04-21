require 'pry'

clicks = eval(File.read("clicks.rb"))

class ClickFilter
  def self.separate_by_hour(clicks)
    clicks_each_hour = []
    for h in 0..23
      clicks_this_hour = clicks.select{ |c| c[:timestamp].split(" ")[1].split(":")[0].to_i == h}
      clicks_each_hour.push(clicks_this_hour) if clicks_this_hour.any?
    end
    clicks_each_hour
  end

  def self.find_most_expensive(separated_clicks)
    result_set = []
    separated_clicks.each do |hour_of_clicks|
      #find the max amount
      max_amount = hour_of_clicks.max{|a, b| a[:amount] <=> b[:amount]}[:amount]
      #create a new array of clicks that contain the max amount
      clicks_with_max_amount = hour_of_clicks.select{|h| h[:amount] == max_amount}
      #if the array.length is > 1, get the click that has the min timestamp
      if clicks_with_max_amount.length > 1
        result_set.push(clicks_with_max_amount.min {|a, b| a[:timestamp] <=> b[:timestamp]})
      else
        result_set.push(clicks_with_max_amount[0])
      end
    end
    result_set
  end

  def self.filter_more_than_ten(clicks)
    #takes the entire clicks array
    clicks_count = {}
    clicks.each do |click|
      if !clicks_count[click[:ip]]
        clicks_count[click[:ip]] = 1
      else
        clicks_count[click[:ip]] += 1
      end
    end
    clicks_count
    ips_to_remove = clicks_count.select{ |ip, count| count > 10 }.keys
    return clicks.reject{ |c| ips_to_remove.include?(c[:ip])}
  end
end

puts ClickFilter.find_most_expensive(ClickFilter.separate_by_hour(ClickFilter.filter_more_than_ten(clicks)))
