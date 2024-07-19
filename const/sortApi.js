export const sortAPI = {
    bubbleSort(arr, comparation) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (comparation(arr[j], arr[j + 1])) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
    },
    quickSort(items, left, right) {
      let index;
      if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
          quickSort(items, left, index - 1);
        }
        if (index < right) {
          quickSort(items, index, right);
        }
      }
      return items;
    },
    selectionSort(arr, comparation) {
      // обратите внимание на список инициализаций в цикле
      for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
        let indexMin = i;
        // поиск минимального элемента в правой части массива
        for (let j = i + 1; j < l; j++) {
          if (comparation(arr[indexMin], arr[j])) {
            indexMin = j;
          }
        }
        // проверка корректности поиска и обмен значениями
        // при обмене используется деструктуризация
        if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        }
      }
      return arr;
    },
  
    // Выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
      const start = new Date().getTime();
      sort(arr, comparation);
      const end = new Date().getTime();
      sortTime = `${end - start} ms`;
    },
  };