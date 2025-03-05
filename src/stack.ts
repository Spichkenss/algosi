class StackNode<T> {
  constructor(
    public value: T,
    public next: StackNode<T> | null = null
  ) {}
}

class Stack<T> {
  // Ссылка на верхний элемент стека
  private top: StackNode<T> | null = null;

  /**
   * Метод проверки стека на пустоту.
   * Если верхний элемент стека равен null, то считаем, что стек пуст
   */
  public isEmpty(): boolean {
    return this.top === null;
  }

  /**
   * Метод добавления элемента в стек
   */
  public push(value: T): Stack<T> {
    // Создаем новый узел и помещаем его на верх стека
    this.top = new StackNode(value, this.top);

    return this; // Возвращаем текущий объект стека
  }

  /**
   * Метод получения верхнего элемента стека с удалением
   */
  public pop(): T {
    // Если стек пустой, то кидаем ошибку о том, что невозможно вытащить что-то из пустого стека
    if (this.isEmpty()) {
      throw new Error("Cannot pop item from empty stack");
    }

    const top = this.top!; // Сохраняем ссылку на верхний элемент стека
    this.top = top.next; // Назначаем верхним элементом стека следующий узел

    return top.value; // Возвращаем сохраненный верхний элемент стека
  }

  /**
   * Метод получения верхнего элемента стека без удаления
   */
  public peek(): T {
    // Если стек пустой, то кидаем ошибку о том, что невозможно вытащить что-то из пустого стека
    if (this.isEmpty()) {
      throw new Error("Cannot peek item from empty stack");
    }

    return this.top!.value; // Возвращаем верхний элемент стека
  }
}


const stack = new Stack<number>();

stack.push(1).push(2);

console.log(`Заполненный стек: ${JSON.stringify(stack, null, 2)} \n`);

console.log(`Получение верхнего элемента без его удаления...`);
console.log(`Верхний элемент стека: ${stack.peek()} \n`)

console.log(`Промежуточное состояние стека: ${JSON.stringify(stack, null, 2)} \n`);

console.log(`Получение верхнего элемента с его удалением...`);
console.log(`Верхний элемент стека: ${stack.pop()} \n`)

console.log(`Конечное состояние стека: ${JSON.stringify(stack, null, 2)} \n`);

