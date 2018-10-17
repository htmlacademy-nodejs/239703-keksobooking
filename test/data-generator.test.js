'use strict';
const generateEntity = require(`../src/data-generator`);

const assert = require(`assert`);

describe(`data-generator`, () => {
  describe(`generateEntity`, () => {
    it(`should return generated data`, () => {
      const avatarUrl = `https://robohash.org/`;
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
      const data = generateEntity();
      const addressArray = data.offer.address.split(`,`);

      function checkValuesFromRange(value, min, max) {
        return +value >= min && +value <= max;
      }

      function checkAddress(addresses, [xMin, xMax], [yMin, yMax]) {
        return (checkValuesFromRange(+addresses[0].trim(), xMin, xMax) && checkValuesFromRange(+addresses[1].trim(), yMin, yMax));
      }

      function checkDateFormat(date) {
        const regex = RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
        return regex.test(date);
      }

      assert.equal(data.author.avatar.includes(avatarUrl), true, `Url should include https://robohash.org/`);
      assert.equal(checkAddress(addressArray, [300, 900], [150, 500]), true, `Address should return values from range`);
      assert.equal(checkValuesFromRange(data.offer.price, 1000, 1000000), true, `Price should return values from range`);
      assert.equal(checkValuesFromRange(data.offer.rooms, 1, 5), true, `Rooms should return values from range`);
      assert.equal(typeof data.offer.guests, `number`, `Price should return values from range`);
      assert.equal(titles.includes(data.offer.title), true, `Title should contain one of the value`);
      assert.equal(types.includes(data.offer.type), true, `Type should contain one of the value`);
      assert.equal(checkin.includes(data.offer.checkin), true, `Checkin Should contain one o f the value`);
      assert.equal(checkout.includes(data.offer.checkout), true, `Checkout Should contain one of the value`);
      assert.equal(features.includes(data.offer.features), true, `Features should contain one of the value`);
      assert.equal(photos.includes(data.offer.photos), true, `Photos should contain one of the value`);
      assert.equal(photos.includes(data.offer.description), ``, `Description should be a blank string`);
      assert.equal(checkValuesFromRange(data.location.x, 300, 900), true, `Location.x should return values from range`);
      assert.equal(checkValuesFromRange(data.location.y, 150, 500), true, `location.y should return values from range`);
      assert.equal(checkDateFormat(data.date), true, `Date format should be a unix timestamp string`);
    });
  });
});
