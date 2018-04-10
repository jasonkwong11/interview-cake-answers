require 'pry'

clicks = [
  { ip:'22.22.22.22', timestamp:'3/11/2016 02:02:58', amount: 7.00 },
  { ip:'11.11.11.11', timestamp:'3/11/2016 02:12:32', amount: 6.50 },
  { ip:'11.11.11.11', timestamp:'3/11/2016 02:13:11', amount: 7.25 },
  { ip:'44.44.44.44', timestamp:'3/11/2016 02:13:54', amount: 8.75 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 05:02:45', amount: 11.00 },
  { ip:'44.44.44.44', timestamp:'3/11/2016 06:32:42', amount: 5.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 06:35:12', amount: 2.00 },
  { ip:'11.11.11.11', timestamp:'3/11/2016 06:45:01', amount: 12.00 },
  { ip:'11.11.11.11', timestamp:'3/11/2016 06:59:59', amount: 11.75 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 07:01:53', amount: 1.00 },
  { ip:'11.11.11.11', timestamp:'3/11/2016 07:02:54', amount: 4.50 },
  { ip:'33.33.33.33', timestamp:'3/11/2016 07:02:54', amount: 15.75 },
  { ip:'66.66.66.66', timestamp:'3/11/2016 07:02:54', amount: 14.25 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 07:03:15', amount: 12.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 08:02:22', amount: 3.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 09:41:50', amount: 4.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 10:02:54', amount: 5.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 11:05:35', amount: 10.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 13:02:21', amount: 6.00 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 13:02:40', amount: 8.00 },
  { ip:'44.44.44.44', timestamp:'3/11/2016 13:02:55', amount: 8.00 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 13:33:34', amount: 8.00 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 13:42:24', amount: 8.00 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 13:47:44', amount: 6.25 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 14:02:54', amount: 4.25 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 14:03:04', amount: 5.25 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 15:12:55', amount: 6.25 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 16:02:36', amount: 8.00 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 16:22:11', amount: 8.50 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 17:18:19', amount: 11.25 },
  { ip:'55.55.55.55', timestamp:'3/11/2016 18:19:20', amount: 9.00 },
  { ip:'22.22.22.22', timestamp:'3/11/2016 23:59:59', amount: 9.00 }
]

#Req 1:
# method 1: separate the clicks array into an array of clicks by hour

# method 2: iterate over the each hour of clicks(an array), for each
# array, find the most expensive click

#Req 2: if there are duplicate clicks from the same ip into
#the result set,

def separate_by_hour(clicks)
  clicks_each_hour = []
  for h in 0..23
    clicks_this_hour = clicks.select{ |c| c[:timestamp].split(" ")[1].split(":")[0].to_i == h}
    clicks_each_hour.push(clicks_this_hour) if clicks_this_hour.any?
  end
  clicks_each_hour
end

def find_most_expensive(separated_clicks)
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

def filter_more_than_ten(clicks)
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

puts find_most_expensive(separate_by_hour(filter_more_than_ten(clicks)))
