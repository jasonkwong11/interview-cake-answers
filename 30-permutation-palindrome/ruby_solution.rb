require 'set'
# Set: a collection of unordered values with no duplicates
# a hybrid of Array's intuitive inter-operation
# facilities and Hash's fast look up

# Think of it as an array with only unique elements
# s1 = Set.new [1, 2]  # -> #<Set: {1, 2}>

def has_palindrome_permutation(string)

  # track characters we've seen an odd number of times
  unpaired_characters = Set.new

  (0...string.length).each do |i|
    char = string[i]

    if unpaired_characters.include?(char)
      unpaired_characters.delete(char)
    else
      unpaired_characters.add(char)
    end
  end

  #the string has a palindrome permutation if it
  #has one or zero characters without a pair
  return unpaired_characters.length <= 1
end
