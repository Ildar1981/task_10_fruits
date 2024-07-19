import { fruitsJSON } from './fruits.js';
import { priority } from '../const/const.js';


// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector(".fruits__list"); // список карточек
const shuffleButton = document.querySelector(".shuffle__btn"); // кнопка перемешивания
const filterButton = document.querySelector(".filter__btn"); // кнопка фильтрации
const sortKindLabel = document.querySelector(".sort__kind"); // поле с названием сортировки
const sortTimeLabel = document.querySelector(".sort__time"); // поле с временем сортировки
const sortChangeButton = document.querySelector(".sort__change__btn"); // кнопка смены сортировки
const sortActionButton = document.querySelector(".sort__action__btn"); // кнопка сортировки
const kindInput = document.querySelector(".kind__input"); // поле с названием вида
const colorInput = document.querySelector(".month__input"); // поле с названием цвета
const weightInput = document.querySelector(".weight__input"); // поле с весом
const addActionButton = document.querySelector(".add__action__btn"); // кнопка добавления
const sortLenght = document.querySelector(".lenght__btn"); 
const sortActionName = document.querySelector(".sort__action__btn_name"); // кнопка сортировки по наименованию




// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
console.log(fruitsJSON)

/*** ОТОБРАЖЕНИЕ ***/
const daysArray = [];
// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    const span = document.createElement("li");
    span.classList.add("fruit__item");
    if (fruits[i].month == "Январь") {
      span.classList.add("fruit_grey");
    }
    if (fruits[i].month == "Февраль") {
      span.classList.add("fruit_black");
    }
    if (fruits[i].month == "Март") {
      span.classList.add("fruit_pink");
    }
    if (fruits[i].month == "Апрель") {
      span.classList.add("fruit_olive");
    }
    if (fruits[i].month == "Май") {
      span.classList.add("fruit_grey");
    }
    if (fruits[i].month == "Июнь") {
      span.classList.add("fruit_violet");
    }
    if (fruits[i].month == "Июль") {
      span.classList.add("fruit_green");
    }
    if (fruits[i].month == "Август") {
      span.classList.add("fruit_carmazin");
    }
    if (fruits[i].month == "Сентябрь") {
      span.classList.add("fruit_yellow");
    }
    if (fruits[i].month == "Октябрь") {
      span.classList.add("fruit_lightbrown");
    }
    if (fruits[i].month == "Ноябрь") {
      span.classList.add("fruit_lightbrown");
    }
    if (fruits[i].month == "Декабрь") {
      span.classList.add("fruit_lightbrown");
    }
    if (fruits[i].month == "undefined") {
      span.classList.add("fruit_undefined");
    }

    
    fruitsList.appendChild(span)

    const div = document.createElement("div");
    div.classList.add("fruit__info");
    span.appendChild(div);

    div.innerHTML = `
  <div>index: ${i + 1}</div>
  <div>kind: ${fruits[i].human}</div>
  <div>color: ${fruits[i].month}</div>
  <div>day: ${fruits[i].day}</div>
  <div>не забыть поздравить!!</div>
  `;
  daysArray.push(fruits[i].day);
  }
  
};

// первая отрисовка карточек
display();

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

function sortNumbers(arr) {
  arr.sort(function(a, b) {
    return a.day - b.day; // Используем a.day и b.day для сортировки
  });

  return arr;
}

filterButton.addEventListener("click", () => {
  sortNumbers(fruits); // Изменяем daysArray на fruits
  display();
  console.log(fruits); // Изменяем daysArray на fruits
});

function sortByNameLength(arr) {
  arr.sort(function(a, b) {
    return a.human.length - b.human.length; // Сортируем по длине имени
  });
  return arr;
}

sortLenght.addEventListener("click", ()=>{
  sortByNameLength(fruits);
  display();
} )

/*** СОРТИРОВКА ***/

let sortKind = "bubbleSort"; // инициализация состояния вида сортировки
let sortTime = "-"; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  
  const color1 = priority.indexOf(a.month);
  const color2 = priority.indexOf(b.month);
  return color1 > color2;
};

//функция сортировки по наименованию
function sortName(arr) {
  return arr.sort(function (a, b) {
    var first = a.human.toUpperCase(); // Приводим наименование к верхнему регистру для корректного сравнения
    var second = b.human.toUpperCase();

    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
}
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
  if (
    kindInput.value === "" ||
    colorInput.value === "" ||
    weightInput.value === ""
  ) {
    alert("Заполните сперва поля!");
  } else {
      fruits.push({
        human: kindInput.value,
        month: colorInput.value,
        day: weightInput.value,
      });
      display();
      kindInput.value = "";
      colorInput.value = "";
      weightInput.value = "";
    }
  });



