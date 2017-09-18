
message = 'find you will pain only go you recordings security the into if'

def reverse_words(message)
  message_array = message.split(' ')
  message_array.collect {|word| word.reverse }.join(' ')
end

puts reverse_words(message)