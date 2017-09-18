def reverse(string)
  reversed_string = ""

  end_pointer = string.length - 1
  while end_pointer >= 0
    reversed_string << string[end_pointer]
    end_pointer -= 1
  end
  reversed_string
end

puts reverse("cats")
