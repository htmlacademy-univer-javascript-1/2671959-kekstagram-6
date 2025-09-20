//Задание 1
const checkStringLength = function (string, maxLength) {
  return string.length<= maxLength;
};

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


//Задание 2
const checkPalindrome = function (string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let invertedString = '';
  for (let i = newString.length - 1; i >= 0; i--){
    invertedString += newString.at(i);
  }
  return invertedString === newString;
};

// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс');  // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true
