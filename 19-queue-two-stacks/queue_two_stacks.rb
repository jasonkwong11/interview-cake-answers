class QueueTwoStacks
  def initialize
    @in_stack = []
    @out_stack = []
  end

  def enqueue(item)
    @in_stack.push(item)
  end

  def dequeue()
    if @out_stack.length == 0
      # Move items from in_stack to out_stack, reversing order
      while @in_stack.length > 0 do
        newest_in_stack_item = @in_stack.pop
        @out_stack.push(newest_in_stack_item)
      end

      #if outstack is still empty, return nil
      return nil if @out_stack.length == 0
    end
    return @out_stack.pop
  end
end
