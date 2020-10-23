function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array;
}

function arrayOfNumbers(length, size) {
  let newArray = Array(length).keys()
  newArray = Array.from(newArray)
  newArray = shuffle(newArray)
  return newArray.slice(0, size)
}

function multiplyItems(item, number) {
  for(let i = 0; i < number; i++) {
    return item
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}