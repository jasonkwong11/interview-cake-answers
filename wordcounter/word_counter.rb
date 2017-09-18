#Generate a count of the occurrences of each word for this text. 
#Output a list of words and counts in descending count order 
#(word with highest count listed first):

def word_counter(file)
  file = File.read(file)
  word_arr = file.split(' ').collect {|word| word.upcase.gsub(/\W+/, '')}
  hash_counter = {}
  word_arr.each do |word|
    !hash_counter[word] ? hash_counter[word] = 1 : hash_counter[word] += 1
  end
  hash_counter.sort_by {|word, count| v }.reverse.each do |word, count|
    puts "#{word}: #{count}"
  end
end

word_counter("input.txt")