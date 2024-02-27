// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector(".fruits__list"); // список карточек
const shuffleButton = document.querySelector(".shuffle__btn"); // кнопка перемешивания
const filterButton = document.querySelector(".filter__btn"); // кнопка фильтрации
const sortKindLabel = document.querySelector(".sort__kind"); // поле с названием сортировки
const sortTimeLabel = document.querySelector(".sort__time"); // поле с временем сортировки
const sortChangeButton = document.querySelector(".sort__change__btn"); // кнопка смены сортировки
const sortActionButton = document.querySelector(".sort__action__btn"); // кнопка сортировки
const kindInput = document.querySelector(".kind__input"); // поле с названием вида
const colorInput = document.querySelector(".color__input"); // поле с названием цвета
const weightInput = document.querySelector(".weight__input"); // поле с весом
const addActionButton = document.querySelector(".add__action__btn"); // кнопка добавления
const minWeight = document.querySelector(".minweight__input"); // поле min weight
const maxWeight = document.querySelector(".maxweight__input");
const sortActionName = document.querySelector(".sort__action__btn_name"); // кнопка сортировки по наименованию

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement("li");
    li.classList.add("fruit__item");
    if (fruits[i].color == "серый") {
      li.classList.add("fruit_grey");
    }
    if (fruits[i].color == "черный") {
      li.classList.add("fruit_black");
    }
    if (fruits[i].color == "розовый") {
      li.classList.add("fruit_pink");
    }
    if (fruits[i].color == "оливковый") {
      li.classList.add("fruit_olive");
    }
    if (fruits[i].color == "серый") {
      li.classList.add("fruit_grey");
    }
    if (fruits[i].color == "фиолетовый") {
      li.classList.add("fruit_violet");
    }
    if (fruits[i].color == "зеленый") {
      li.classList.add("fruit_green");
    }
    if (fruits[i].color == "розово-красный") {
      li.classList.add("fruit_carmazin");
    }
    if (fruits[i].color == "желтый") {
      li.classList.add("fruit_yellow");
    }
    if (fruits[i].color == "светло-коричневый") {
      li.classList.add("fruit_lightbrown");
    }

    fruitsList.appendChild(li);

    const div = document.createElement("div");
    div.classList.add("fruit__info");
    li.appendChild(div);

    div.innerHTML = `
  <div>index: ${i + 1}</div>
  <div>kind: ${fruits[i].kind}</div>
  <div>color: ${fruits[i].color}</div>
  <div>weight (кг): ${fruits[i].weight}</div>
  `;
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let myFruits = [...fruits];

  while (fruits.length > 0) {
    let randomFruits = getRandomInt(0, fruits.length - 1);
    result.push(fruits[randomFruits]);
    fruits.splice(randomFruits, 1);
  }

  fruits = result;
  let notShuffled = fruits.some((el, index) => el === myFruits[index]);
  if (notShuffled) {
    alert("Плохо перемешано, совпало! Ещё раз.");
  }
};

shuffleButton.addEventListener("click", () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  return fruits.filter((item) => {
    // TODO: допишите функцию
    const max = parseInt(maxWeight.value);
    const min = parseInt(minWeight.value);
    if (max < 0 || min < 0) {
      alert("Вес не должен быть отрицательным!");
      maxWeight.value = "";
      minWeight.value = "";
      return fruits;
    }
    if (isNaN(max) || isNaN(min)) {
      alert("Только числовой!");
      maxWeight.value = "";
      minWeight.value = "";
      return fruits;
    }
    if (max < min) {
      [max, min] = [min, max];
    }
    return item.weight >= min && item.weight <= max;
  });
};

filterButton.addEventListener("click", () => {
  fruits = filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = "bubbleSort"; // инициализация состояния вида сортировки
let sortTime = "-"; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = [
    "зеленый",
    "желтый",
    "фиолетовый",
    "розово-красный",
    "светло-коричневый",
    "черный",
    "серый",
    "розовый",
    "оливковый",
  ];
  const color1 = priority.indexOf(a.color);
  const color2 = priority.indexOf(b.color);
  return color1 > color2;
};

//функция сортировки по наименованию
function sortName(arr) {
  return arr.sort(function (a, b) {
    var first = a.kind.toUpperCase(); // Приводим наименование к верхнему регистру для корректного сравнения
    var second = b.kind.toUpperCase();

    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
}

const sortAPI = {
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

// Инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

// Переключать значение sortKind между 'bubbleSort' / 'quickSort'/ selectionSort
sortChangeButton.addEventListener("click", () => {
  sortKindLabel.textContent === "bubbleSort"
    ? (sortKindLabel.textContent = "quickSort")
    : sortKindLabel.textContent === "quickSort"
    ? (sortKindLabel.textContent = "selectionSort")
    : (sortKindLabel.textContent = "bubbleSort");
});

sortActionButton.addEventListener("click", () => {
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});
//сортировка по названию
sortActionName.addEventListener("click", () => {
  sortName(fruits);
  display();
});
/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener("click", () => {
  // Создание и добавление нового фрукта в массив fruits
  if (
    kindInput.value === "" ||
    colorInput.value === "" ||
    weightInput.value === ""
  ) {
    alert("Одно или несколько полей не заполнены!");
  } else {
    if (isNaN(weightInput.value)) {
      alert("Вес должен быть указан числом!");
      weightInput.value = "";
    } else {
      fruits.push({
        kind: kindInput.value,
        color: colorInput.value,
        weight: weightInput.value,
      });
      display();
      // Очистка полей после добавления фрукта
      kindInput.value = "";
      colorInput.value = "";
      weightInput.value = "";
    }
  }
});
