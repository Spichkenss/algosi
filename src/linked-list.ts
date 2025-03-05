class LinkedListNode<T> {
  constructor(
    public value: T,
    public next: LinkedListNode<T> | null = null
  ) {}

  public toArray(cb?: (item: LinkedListNode<T>) => T): T[] {
    const result: T[] = [];
    let current: LinkedListNode<T> | null = this;

    while (current) {
      result.push(cb ? cb(current) : current.value);
      current = current.next;
    }

    return result;
  }
}

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;
  private length: number = 0;

  /**
   * Проверяет, пуст ли список
   */
  public isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Возвращает длину списка
   */
  public size(): number {
    return this.length;
  }

  /**
   * Добавляет элемент в конец списка
   */
  public append(value: T): this {
    // Создаем объект нового узла
    const newNode = new LinkedListNode(value);

    /**
     * Если у нас определен последний элемент списка, то
     * сразу по его ссылке на следующий элемент
     * сохраним новый узел
     */
    if (this.tail) {
      this.tail.next = newNode;

    /**
     * Иначе поместим новый узел в начало списка
     */
    } else {
      this.head = newNode;
    }

    // Обновляем ссылку на последний элемент списка
    this.tail = newNode;

    // Увелчиваем длину списка
    this.length++;

    // Возвращаем сам список для возможности цепочки вызовов
    return this;
  }

  /**
   * Добавляет элемент в начало списка
   */
  public prepend(value: T): this {
    // Создаем новый узел, который ссылается на текущую голову списка
    const newNode = new LinkedListNode(value, this.head);

    // Устанавливаем новый узел как голову списка
    this.head = newNode;

    // Если список был пуст, то новый узел становится и хвостом
    if (!this.tail) {
      this.tail = newNode;
    }

    // Увеличиваем длину списка
    this.length++;

    // Возвращаем сам список для возможности цепочки вызовов
    return this;
  }

  /**
   * Вставляет элемент по указанному индексу
   */
  public insert(value: T, index: number): this {
    // Проверяем, что индекс находится в допустимом диапазоне
    if (index < 0 || index > this.length) {
      throw new Error('Индекс вне диапазона');
    }

    // Если индекс равен 0, то добавляем элемент в начало
    if (index === 0) {
      return this.prepend(value);
    }

    // Если индекс равен длине списка, то добавляем элемент в конец
    if (index === this.length) {
      return this.append(value);
    }

    // Находим узел, перед которым нужно вставить новый элемент
    let current = this.head;

    // Проходим по списку до нужного индекса
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    // Создаем новый узел и вставляем его после текущего
    current!.next = new LinkedListNode(value, current!.next);

    // Увеличиваем длину списка
    this.length++;

    // Возвращаем сам список для возможности цепочки вызовов
    return this;
  }

  /**
   * Удаляет элемент по указанному индексу
   */
  public removeAt(index: number): this {
    // Проверяем, что индекс находится в допустимом диапазоне
    if (index < 0 || index >= this.length) {
      throw new Error('Индекс вне диапазона');
    }

    // Если удаляем первый элемент
    if (index === 0) {
      this.head = this.head!.next;

      // Если удаляется единственный элемент в списке, то сбрасываем хвост
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      // Ищем узел, перед которым нужно удалить элемент
      let current = this.head;

      // Проходим по списку до нужного индекса
      for (let i = 0; i < index - 1; i++) {
        current = current!.next;
      }

      // Перепривязываем указатель next для текущего узла, чтобы пропустить удаляемый узел
      current!.next = current!.next!.next;

      // Если удаляется последний элемент, обновляем хвост
      if (index === this.length - 1) {
        this.tail = current;
      }
    }

    // Уменьшаем длину списка
    this.length--;

    // Возвращаем сам список для возможности цепочки вызовов
    return this;
  }

  /**
   * Удаляет первый элемент списка
   */
  public removeFirst(): this {
    // Если список пуст, выбрасываем ошибку
    if (this.isEmpty()) {
      throw new Error('Список пуст');
    }

    // Удаляем первый элемент
    return this.removeAt(0);
  }

  /**
   * Удаляет последний элемент списка
   */
  public removeLast(): this {
    // Если список пуст, выбрасываем ошибку
    if (this.isEmpty()) {
      throw new Error('Список пуст');
    }

    // Удаляем последний элемент
    return this.removeAt(this.length - 1);
  }

  /**
   * Находит первый узел, удовлетворяющий предикату
   */
  public find(predicate: (value: T, index: number) => boolean): LinkedListNode<T> | null {
    let current = this.head;
    let index = 0;

    // Проходим по списку, пока не найдем узел, удовлетворяющий предикату
    while (current) {
      if (predicate(current.value, index)) {
        return current;
      }

      current = current.next;
      index++;
    }
    return null;
  }

  /**
   * Подсчитывает количество элементов, удовлетворяющих предикату
   */
  public count(predicate: (value: T, index: number) => boolean): number {
    let current = this.head;
    let count = 0;
    let index = 0;

    // Проходим по списку и считаем количество элементов, удовлетворяющих предикату
    while (current) {
      if (predicate(current.value, index)) {
        count++;
      }

      current = current.next;
      index++;
    }
    return count;
  }

  /**
   * Выводит элементы списка в консоль
   */
  public print(cb?: (v: T) => string): void {
    // Если список пуст, выводим соответствующее сообщение
    if (this.isEmpty()) {
      console.log('Список пуст');
      return;
    }

    const values: string[] = [];
    let current = this.head;

    // Проходим по списку и добавляем элементы в массив для последующего вывода
    while (current) {
      let val = cb ? cb(current.value) : String(current.value);
      values.push(val);
      current = current.next;
    }

    // Выводим элементы в формате "value1 -> value2 -> ... -> valueN"
    console.log(values.join(' -> '));
  }

  public merge(
    list: LinkedList<T>,
    comporator?: (a: T, b: T) => number
  ): LinkedList<T> {
    let currentA = this.head; // Указатель на головной узел текущего списка
    let currentB = list.head; // Указатель на головной узел списка, который мы вмерживаем в текущий

    if (!currentA) return list; // Если this пуст, вернуть другой список
    if (!currentB) return this; // Если list пуст, вернуть текущий

    const resultList = new LinkedList<T>(); // Результирующий список

    // Определяем дефолтный компаратор
    const _comparator = ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

    // Определяем финальный компаратор
    const finalComparator = comporator ?? _comparator;

    // Входим в цикл, пока не закончится один из списокв
    while (currentA && currentB) {
      /**
       * Сравниваем два значения
       * - Вставляем в результирующий список значение меньшего узла
       * - Перемещаем указатель меньшего списка на следующий узел
       */
      if (finalComparator(currentA.value, currentB.value) < 0) {
        resultList.append(currentA.value);
        currentA = currentA.next;
      } else {
        resultList.append(currentB.value);
        currentB = currentB.next;
      }
    }

    // Определяем список, в котором еще остались элементы
    let rest = currentA ?? currentB;

    if (rest) {
      // Добавляем остатки в конец результирующего списка
      resultList.tail!.next = rest;
    }

    return resultList;
  }

  public reverse(): LinkedListNode<T>  {
    let [prev, current, next]: (LinkedListNode<T> | null)[] = [null, this.head, null];

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    if (!prev) {
      throw new Error("Reverse error!")
    }

    return prev;
  }
}

type User = {
  id: number;
  name: string;
}

const listOfUsersA = new LinkedList<User>();

listOfUsersA
  .append({ id: 1, name: "Alexandr B." })
  .append({ id: 3, name: "Alexey Y." })
  .append({ id: 5, name: "Alexey R." })
  .print(user => user.name)

const namesOfReversedListOfUsersA = listOfUsersA.reverse().toArray();

console.log(namesOfReversedListOfUsersA);

// const listOfUsersB = new LinkedList<User>();
//
// listOfUsersB
//   .append({ id: 2, name: "Oleg J." })
//   .append({ id: 4, name: "Vladimir K." })
//   .append({ id: 6, name: "Timofey U." })
//
// listOfUsersA
//   .merge(listOfUsersB, (a, b) => a.id.toString().localeCompare(b.id.toString()))
//   .print((user) => user.name);