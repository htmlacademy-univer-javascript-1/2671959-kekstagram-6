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


//Задание 3
function extractNumber(arg) {
  const str = arg.toString();
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  if (result.length > 0) {
    return parseInt(result, 10);
  }

  return NaN;
}

// Примеры использования:
extractNumber('2023 год');           // 2023
extractNumber('ECMAScript 2022');    // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007');          // 7
extractNumber('a я томат');          // NaN
extractNumber(2023);                 // 2023
extractNumber(-1);                   // 1
extractNumber(1.5);                  // 15

// Делу - время
const workTime = (start, end, meeting, meetingDuration) => {
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const meetingMinutes = timeToMinutes(meeting);
  const meetingEndMinutes = meetingMinutes + meetingDuration;

  return meetingMinutes >= startMinutes && meetingEndMinutes <= endMinutes;
};

workTime('08:00', '17:30', '14:00', 90); // true
workTime('8:0', '10:0', '8:0', 120);     // true
workTime('08:00', '14:30', '14:00', 90); // false
workTime('14:00', '17:30', '08:0', 90);  // false
workTime('8:00', '17:30', '08:00', 900); // false
