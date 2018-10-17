'use strict';
const titles = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const types = [`flat`, `palace`, `house`, `bungalo`];
const checkin = [`12:00`, `13:00`, `14:00`];
const checkout = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

function randomFromRange(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function getValuesFromArray(values) {
  const i = randomFromRange(0, values.length - 1);
  return values[i];
}

function generateRandomString() {
  const symbols = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

  return symbols.split(``).reduce((acc, item, index, array) => {
    const i = randomFromRange(0, array.length);
    return `${acc}${array[i]}`;
  }, ``);
}

function generateGuests() {
  return Math.floor(Math.random() * 100);
}

function addZero(n) {
  if (n < 10) {
    n = `0${n}`;
  }
  return n;
}

function generateDate() {
  const now = Date.now();
  const then = new Date();
  then.setDate(then.getDate() - 7);
  const msec = randomFromRange(then.getTime(), now);
  const date = new Date(parseInt(msec, 10));
  const year = date.getFullYear();
  const day = addZero(date.getDay());
  const month = addZero(date.getMonth());
  const hours = addZero(date.getHours());
  const minutes = `0${addZero(date.getMinutes())}`;
  const seconds = `0${addZero(date.getSeconds())}`;

  return `${year}-${day}-${month} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}

const location = {
  x: randomFromRange(300, 900),
  y: randomFromRange(150, 500)
};

module.exports = function generateEntity() {
  return {
    author: {
      avatar: `https://robohash.org/${generateRandomString()}`
    },
    offer: {
      title: getValuesFromArray(titles),
      address: `${location.x}, ${location.y}`,
      price: randomFromRange(1000, 1000000),
      type: getValuesFromArray(types),
      rooms: randomFromRange(1, 5),
      guests: generateGuests(),
      checkin: getValuesFromArray(checkin),
      checkout: getValuesFromArray(checkout),
      features: getValuesFromArray(features),
      description: ``,
      photos: getValuesFromArray(photos)
    },
    location,
    date: generateDate()
  };
};
