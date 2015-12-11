function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  "use strict";
  items.forEach(function (item) {
    if (!isAgedBrie(item) && !isBackstagePass(item)) {
      if (isQualityPositive(item) && !isSulfuras(item)) {
          decrementQuality(item);
      }
    } else {
      if (isQualityLimit(item)) {
        incrementQuality(item);
        if (isBackstagePass(item) && isQualityLimit(item)) {
          if (item.sell_in < 11) {
              incrementQuality(item);
          }
          if (item.sell_in < 6) {
              incrementQuality(item);
          }
        }
      }
    }
    if (!isSulfuras(item)) {
      item.sell_in = item.sell_in - 1;
    }
    if (item.sell_in < 0) {
      if (!isAgedBrie(item)) {
        if (!isBackstagePass(item) && isQualityPositive(item) && !isSulfuras(item)) {
          decrementQuality(item);
        } else {
          item.quality = 0;
        }
      } else {
        if (isQualityLimit(item)) {
          incrementQuality(item);
        }
      }
    }
  });


  function isAgedBrie(item) {

    return item.name === 'Aged Brie';
  }

  function isSulfuras(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  function isBackstagePass(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  function incrementQuality(item){
    item.quality ++;
  }

  function decrementQuality(item){
    item.quality --;
  }

  function isQualityPositive(item){
    return item.quality > 0;
  }

  function isQualityLimit(item){
    return item.quality < 50;
  }

  function isSellEarly(item){
    return item.sell_in < 11;
  }
}
