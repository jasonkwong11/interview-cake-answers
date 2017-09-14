
def reverse_linked_list(linked_list)
  node = linked_list
  previous = nil

  while (node)
    #save the next or you lose it:
    save = node.next
    #reverse pointer
    node.next = previous
    #increment previous to current node:
    previous = node
    node = save
  end
  previous
end